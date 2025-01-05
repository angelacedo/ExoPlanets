import { Exoplanet } from "@/models/Exoplanet";
import { PlanetType } from "@/models/Repository/ExoplanetType";
import { Filters } from "@/models/Repository/Filters";
import { Response } from "@/models/Response";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import DBController from "../../../db/DBController";
import DBqueries from "../../../db/DBqueries";
import { runMiddleware } from "../middlewares/middleware";
// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: 'https://exoplanets.angelacedo.net', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);

  const response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null,
    limit: null,
    rowCountWithoutFilters: null
  };


  const connection = await DBController.connect();
  try
  {
    if (middlewareResponse instanceof Error)
    {
      response.status = 500;
      response.errorMessage = "Error: " + (middlewareResponse as Error).message;
    } else
    {
      const { limit, fromOrigin, filters } = req.query;
      const decodedFilters: Filters = JSON.parse(decodeURIComponent(filters as string));
      const query: string = DBqueries.getExoplanetsWithFilters(limit, createFilters(decodedFilters));
      const countQuery: string = DBqueries.removeOffsetAndCountRows(query);
      const [rows] = await DBController.executeQuery(connection, query, fromOrigin && limit ? [fromOrigin, limit] : []);
      const [countRows] = await DBController.executeQuery(connection, countQuery, []);
      if (rows)
      {
        const data = (rows as Exoplanet[]);
        response.data = data;
        response.rowCount = data.length;
        response.limit = Number(limit);
        response.rowCountWithoutFilters = countRows[0].count;
      } else
      {
        response.status = 500;
        response.errorMessage = "Ups! An error has ocurred, try again later.";
      }
    }
    res.status(response.status).json(response);
  } catch (error)
  {
    response.status = 500;
    if (error instanceof Error)
      response.errorMessage = "Unknown Error: " + error.message;
    else
      response.errorMessage = "Unknown Error: " + error;
    res.status(response.status).json(response);
  } finally
  {
    DBController.close(connection);
  }

}

/**********************************************************************
    PLANET TYPE
 **********************************************************************/
export const getPlanetTypeQuery = (planetType: PlanetType): string | null =>
{
  switch (planetType)
  {
    case PlanetType.GasGiant:
      return "pl_bmasse > 95 AND pl_rade > 10.0 ";
    case PlanetType.HotJupiter:
      return "pl_bmasse > 95 AND pl_rade > 10.0 AND pl_orbper < 10 AND pl_eqt > 1000 ";
    case PlanetType.NeptuneLike:
      return "pl_bmasse BETWEEN 17 AND 95 AND pl_rade BETWEEN 3.9 AND 10.0 ";
    case PlanetType.SubNeptune:
      return "pl_bmasse BETWEEN 5 AND 17 AND pl_rade BETWEEN 1.75 AND 3.9 ";
    case PlanetType.SuperEarth:
      return "pl_bmasse BETWEEN 1.5 AND 5 AND pl_rade BETWEEN 1.25 AND 1.75 ";
    case PlanetType.Terrestrial:
      return "pl_bmasse < 1.5 AND pl_rade < 1.25 ";
    case PlanetType.Unknown:
      return "(pl_bmasse IS NULL OR pl_rade IS NULL) OR (pl_bmasse > 95 AND pl_rade IS NULL) OR pl_eqt IS NULL ";
    default:
      return null;
  }
};




/**********************************************************************
    CREATE FILTERS
 **********************************************************************/
export const createFilters = (decodedFilters: Filters): string =>
{

  let filtersQuery = 'WHERE 1=1 ';
  //CheckBox Filters
  if (decodedFilters)
  {

    if (decodedFilters.rangeFilters && decodedFilters.rangeFilters.length > 0)
      decodedFilters.rangeFilters.map((rangeFilters) =>
      {

        switch (rangeFilters.title)
        {
          case "Eccentric Orbit":
            filtersQuery += `AND ((pl_orbeccen BETWEEN ${rangeFilters.value[0]} AND ${rangeFilters.value[1]}) ${rangeFilters.allowNullValues ? 'OR pl_orbeccen IS NULL ' : ''}) `;
            break;
          case "Distance to Earth (ly)":
            filtersQuery += `AND ((sy_dist BETWEEN ${rangeFilters.value[0]} AND ${rangeFilters.value[1]}) ${rangeFilters.allowNullValues ? 'OR sy_dist IS NULL ' : ''}) `;
            break;
        }
      });

    if (decodedFilters.selectFilters && decodedFilters.selectFilters.length > 0)
      decodedFilters.selectFilters.map((selectFilters, index) =>
      {

        if (index == 0 && selectFilters.value != PlanetType.UnFiltered)
        {
          const query = getPlanetTypeQuery(selectFilters.value);
          if(query != null)
            filtersQuery += 'AND ' + query;
        } else if (index == 1 && selectFilters.value != PlanetType.UnFiltered)
        if (selectFilters.value != null)
          filtersQuery += `AND discoverymethod = '${selectFilters.value}' `;
      });

    if (decodedFilters.searchByText)
      filtersQuery += `AND (pl_name LIKE '%${decodedFilters.searchByText}%' OR hostname LIKE '%${decodedFilters.searchByText}%' OR discoverymethod LIKE '%${decodedFilters.searchByText}%') `;
  }

  return filtersQuery;
};
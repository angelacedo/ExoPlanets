import { Exoplanet } from "@/models/Exoplanet";
import { Response } from "@/models/Response";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import DBController from "../../../db/DBController";
import DBqueries from "../../../db/DBqueries";
import { runMiddleware } from "../middlewares/middleware";
// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: 'https://angelacedo.net', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);

  const response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    limit: null
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
      const { limit, fromOrigin } = req.query;
      const baseurl: string = DBqueries.getExoplanets(limit);

      const [rows] = await DBController.executeQuery(connection, baseurl, fromOrigin && limit ? [fromOrigin, limit] : []);
      if (rows)
      {
        const data = (rows as Exoplanet[]);

        response.data = data;
        response.rowCount = data.length;
        response.limit = Number(limit);
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
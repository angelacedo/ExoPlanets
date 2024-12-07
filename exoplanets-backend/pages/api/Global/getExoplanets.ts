import { Exoplanet } from "@/models/Exoplanet";
import { Response } from "@/models/Response";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import { connect, executeQuery } from "../../db/DBController";
import DBqueries from "../../db/DBqueries";
import { runMiddleware } from "../middlewares/middleware";
// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: '*', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);
  const { limit, fromOrigin } = req.query;
  console.log('getExoplanets: ' + limit, fromOrigin);
  let response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null,
    limit: null
  };
  if (middlewareResponse instanceof Error)
  {
    response = {
      status: 500,
      errorMessage: "Error: " + (middlewareResponse as Error).message,
      data: null,
      rowCount: null,
      limit: null
    };
  } else
  {
    const baseurl: string = DBqueries.getExoplanets(limit);
    const connection = await connect();
    let [rows] = await executeQuery(connection, baseurl, [fromOrigin, limit]);

    if (rows)
    {
      const data = (rows as Exoplanet[]);
      response.data = data;
      response.rowCount = data.length;
      response.limit = Number(limit);
    } else
      response = {
        status: 500,
        errorMessage: "Ups! An error has ocurred, try again later.",
        data: null,
        rowCount: null,
        limit: null
      };
  }
  res.status(response.status).json(response);
}
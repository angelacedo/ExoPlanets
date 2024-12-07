import { Exoplanet } from "@/models/Exoplanet";
import { Response } from "@/models/Response";
import Cors from 'cors';
import { FieldPacket, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, executeQuery } from '../../db/DBController';
import DBQueries from "../../db/DBqueries";
import { runMiddleware } from "../middlewares/middleware";

// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: '*', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);
  let response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null,
    limit: null
  };
  if (middlewareResponse instanceof Error)
    response = {
      status: 500,
      errorMessage: "Error: " + (middlewareResponse as Error).message,
      data: null,
      rowCount: null,
      limit: null
    };
  else
  {
    const sql: string = DBQueries.getExoplanetsByMonth();
    const connection = await connect();

     let [rows]: [RowDataPacket[], FieldPacket[]] = await executeQuery(connection, sql, []);
    if (rows)
    {
      const data = rows as Exoplanet[];
      response.data = data;
      response.rowCount = data.length;
    }
    else
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
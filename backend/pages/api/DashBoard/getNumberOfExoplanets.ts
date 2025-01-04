import { Response } from "@/models/Response";
import Cors from 'cors';
import { FieldPacket, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import { close, connect, executeQuery } from "../../db/DBController";
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

  let response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null
  };

  const connection = await connect();
  try
  {
    if (middlewareResponse instanceof Error)
    {
      response.status = 500;
      response.errorMessage = "Error: " + (middlewareResponse as Error).message
    } else
    {
      const year = req.query.year;
      const sql: string = DBqueries.getNumberOfExoplanets(year);
      let [rows]: [RowDataPacket[], FieldPacket[]] = await executeQuery(connection, sql, year == undefined ? [] : [year]);
      if (rows)
        response.rowCount = rows[0].count;
      else
      {
        response.status = 500;
        response.errorMessage = "Ups! An error has ocurred, try again later."
      }
    }
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
    close(connection);
  }
  res.status(response.status).json(response);
}
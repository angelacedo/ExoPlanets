import { Response } from "@/models/Response";
import Cors from 'cors';
import { FieldPacket, RowDataPacket } from "mysql2";
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
    data: null
  };
  const connection = await DBController.connect();
  try
  {
    if (middlewareResponse instanceof Error)
    {
      response.status = 500;
      response.errorMessage = "Error: " + (middlewareResponse as Error).message
    } else
    {
      const distance = req.query.distance || "10";
      const sql: string = DBqueries.getNumberOfClosestPlanets();
      const [rows]: [RowDataPacket[], FieldPacket[]] = await DBController.executeQuery(connection, sql, [Number(distance)]);
      if (rows)
        response.rowCount = rows[0].count;
      else
      {
        response.status = 500;
        response.errorMessage = "Ups! An error has ocurred, try again later.";
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
    DBController.close(connection);
  }
  res.status(response.status).json(response);
}
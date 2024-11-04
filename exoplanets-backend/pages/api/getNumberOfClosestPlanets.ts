import { Response } from "@/models/Response";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "./middlewares/middleware";
import DBqueries from "./reports/DBqueries";

// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: '*', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);
  const distance = req.query.distance || "10";
  let response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null
  };
  if (middlewareResponse instanceof Error)
  {
    response = {
      status: 500,
      errorMessage: "Error: " + (middlewareResponse as Error).message,
      data: null,
      rowCount: null
    };
  } else
  {
    const baseurl: string = DBqueries.getNumberOfClosestPlanets(distance as string);
    const queryResponse = await (await fetch(baseurl)).json();
    if (queryResponse)
    {
      response.rowCount = queryResponse[0].count;
    } else
      response = {
        status: 500,
        errorMessage: "Ups! An error has ocurred, try again later.",
        data: null,
        rowCount: null
      };
  }
  res.status(response.status).json(response);
}
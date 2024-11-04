import { Response } from "@/models/Response";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "./middlewares/middleware";
import DBQueries from "./reports/DBqueries";

// Inicializamos cors
const cors = Cors({
  methods: ['GET', 'HEAD'], // Define los métodos permitidos (puedes agregar POST, PUT, etc.)
  origin: '*', // Permite todos los orígenes (esto debería cambiarse en producción para mayor seguridad)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const middlewareResponse = await runMiddleware(req, res, cors);
  const year = req.query.year || new Date().getFullYear().toString();
  let response: Response = {
    status: 200,
    errorMessage: null,
    data: null,
    rowCount: null
  };
  if (middlewareResponse instanceof Error)
    response = {
      status: 500,
      errorMessage: "Error: " + (middlewareResponse as Error).message,
      data: null,
      rowCount: null
    };
  else
  {
    const baseurl: string = DBQueries.getExoplanetsByMonth(year as string);
    const queryResponse = await (await fetch(baseurl)).json();
    if (queryResponse)
    {
      response.data = queryResponse;
      response.rowCount = queryResponse.length;
    }
    else
      response = {
        status: 500,
        errorMessage: "Ups! An error has ocurred, try again later.",
        data: null,
        rowCount: null
      };
  }
  res.status(response.status).json(response);
}
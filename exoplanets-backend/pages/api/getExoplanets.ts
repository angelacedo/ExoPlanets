import { Exoplanet } from "@/models/Exoplanet";
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
  const limit = req.query.limit || "1";
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
    const baseurl: string = DBqueries.getExoplanets(limit as string);
    const queryResponse: Exoplanet[] = await (await fetch(baseurl)).json();
    let data: Exoplanet[] = [];

    if (queryResponse)
    {
      data = queryResponse.map((val: Exoplanet) =>
      {
        return {
          objectid: val.objectid,
          pl_name: val.pl_name,
          pl_letter: val.pl_letter,
          hostid: val.hostid,
          hostname: val.hostname,
          disc_pubdate: val.disc_pubdate,
          disc_year: val.disc_year,
          disc_method: val.disc_method,
          discoverymethod: val.discoverymethod,
          disc_locale: val.disc_locale,
          disc_facility: val.disc_facility,
          disc_instrument: val.disc_instrument,
          disc_telescope: val.disc_telescope,
          disc_refname: val.disc_refname,
          ra: val.ra,
          rasymerr: val.rasymerr,
          rastr: val.rastr,
          ra_solnid: val.ra_solnid,
          ra_reflink: val.ra_reflink,
          dec: val.dec,
          decsymerr: val.decsymerr,
          decstr: val.decstr,
          dec_solnid: val.dec_solnid,
          dec_reflink: val.dec_reflink,
          glon: val.glon,
          glonstr: val.glonstr,
          glon_solnid: val.glon_solnid,
          glon_reflink: val.glon_reflink,
          glat: val.glat,
          glatstr: val.glatstr,
          glat_solnid: val.glat_solnid,
          glat_reflink: val.glat_reflink,
          elon: val.elon,
          elonstr: val.elonstr,
          elon_solnid: val.elon_solnid,
          elon_reflink: val.elon_reflink,
          elat: val.elat,
          elat_solnid: val.elat_solnid,
          elat_reflink: val.elat_reflink,
          elatstr: val.elatstr,
          sy_dist: val.sy_dist
        };
      });
      response.data = data;
      response.rowCount = data.length;
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
import { CorsRequest } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';


// Helper para convertir funciones de middleware de Express a Promesas
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: CorsRequest, res: NextApiResponse, next: (err?: unknown) => void) => void | Error) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export { runMiddleware };

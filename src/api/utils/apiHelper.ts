import { Response} from 'express';
export const sendResponseError = (res: Response, code: number, message: string) => {
  return res.status(code).send({
    message
  })
}

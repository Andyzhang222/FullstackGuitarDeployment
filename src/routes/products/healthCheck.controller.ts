import { Request, Response } from 'express'
import httpStatus from 'http-status'

const products = [
  { id: 1, name: 'luxury guitar', price: 15 },
  { id: 2, name: 'luxury guitar', price: 15 },
  { id: 3, name: 'luxury guitar', price: 15 }
]

const healthcheck = (req: Request, res: Response) => {
  res.status(httpStatus.OK)
  res.send({ status: 'OK', data: products })
}

export default healthcheck

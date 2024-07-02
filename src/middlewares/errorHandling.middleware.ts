import { Request, Response, NextFunction } from 'express'

import httpStatus from 'http-status'
import AppError from 'utils/appError'
import errorHandler from 'utils/errorHandler'

// catch all unhandled errors
const errorHandling = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  errorHandler.handleError(error)
  const isTrusted = errorHandler.isTrustedError(error)
  const httpStatusCode = isTrusted
    ? (error as AppError).httpCode
    : httpStatus.INTERNAL_SERVER_ERROR
  const responseError = error.message

  res.status(httpStatusCode).json({
    error: responseError
  })
}

export default errorHandling

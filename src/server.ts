import { Server } from 'http'
import app from 'app'
import config from 'config/config'
import logger from 'utils/logger'
import errorHandler from 'utils/errorHandler'

const { port } = config

const server: Server = app.listen(port, (): void => {
  logger.info(`Aapplication listens on PORT: ${port}`)
})

const exitHandler = (): void => {
  if (app) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error)
  if (!errorHandler.isTrustedError(error)) {
    exitHandler()
  }
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', (reason: Error) => {
  throw reason
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

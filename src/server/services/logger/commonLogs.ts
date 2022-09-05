import logger from '.'

export function logInfo(fileName: string, message: string) {
  logger.info(fileName + ': ' + message)
}

export function logError(fileName: string, error: string) {
  logger.error(fileName + ': ' + error)
}

export function logException(fileName: string, error: unknown) {
  logger.error(fileName + '- error: ' + error)
}

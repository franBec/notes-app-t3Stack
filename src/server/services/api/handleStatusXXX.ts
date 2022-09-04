import logger from '../logger'
import { ApiResponse, Metadata } from '../../../schemas/api.schema'

export function handleStatus200(
  data: unknown | null = null,
  metadata: Metadata | null = null,
): ApiResponse {
  //minimun atributes of ApiResponse
  const object: ApiResponse = {
    status: 200,
    success: true,
  }

  //if data, add it!
  if (data) {
    object.data = data
  }

  //if metadata, add it!
  if (metadata) {
    object.metadata = metadata
  }

  return object
}

export function handleStatus400(
  fileName: string,
  message: string,
): ApiResponse {
  const errorMessage = `${fileName} -> error 400 bad request: ${message}`
  logger.info(errorMessage)
  return {
    status: 400,
    success: false,
    message: errorMessage,
  }
}

export function handleStatus401(
  fileName: string,
  debugMessage?: string,
  message = 'Credentials are not valid. Re-authenticate and try again',
): ApiResponse {
  const errorMessage = `${fileName} -> error 401 unauthorized: ${message}`
  const devMessage = `${fileName} -> error 401 unauthorized: ${debugMessage}`
  logger.debug(devMessage)
  logger.info(errorMessage)
  return {
    status: 401,
    success: false,
    message: errorMessage,
  }
}

export function handleStatus403(
  fileName: string,
  message = 'Access to the requested resource is forbidden',
): ApiResponse {
  const errorMessage = `${fileName} -> error 403 forbidden: ${message}`
  logger.info(errorMessage)
  return {
    status: 403,
    success: false,
    message: errorMessage,
  }
}

export function handleStatus404(
  fileName: string,
  message = 'Resource not found',
): ApiResponse {
  const errorMessage = `${fileName} -> error 404 not found: ${message}`
  logger.info(errorMessage)
  return {
    status: 404,
    success: false,
    message: errorMessage,
  }
}

export function handleStatus405(
  fileName: string,
  expectedMethod: string,
  foundMethod: string | undefined,
): ApiResponse {
  const errorMessage = `${fileName} -> error 405 bad method: expected ${expectedMethod}, found ${foundMethod}`
  logger.info(errorMessage)
  return {
    status: 405,
    success: false,
    message: errorMessage,
  }
}

export function handleStatus500(fileName: string, error: unknown): ApiResponse {
  const errorMessage: string =
    fileName + ' -> error 500 internal server error: ' + error
  logger.error(errorMessage)
  return {
    status: 500,
    success: false,
    message: errorMessage,
  }
}

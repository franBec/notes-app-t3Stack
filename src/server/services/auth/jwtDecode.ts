import { LoginTokenPayload } from '../../../schemas/jwtDecode.schema'
import { verify } from './signAndVerify'

import { logInfo, logError, logException } from '../logger/commonLogs'

import { NextApiRequest } from 'next'

const fileName = 'src/server/services/auth/decode'

export default async function getDecodedPayload(
  req: NextApiRequest,
): Promise<LoginTokenPayload> {
  try {
    const cookieName = process.env.COOKIENAME
    if (!cookieName) {
      logError(fileName, 'cookieName is undefined')
      return { error: 'COOKIENAME is missing from env' }
    }

    const cookieSecret = process.env.COOKIESECRET
    if (!cookieSecret) {
      logError(fileName, 'cookiesecret is undefined')
      return { error: 'COOKIESECRET is missing from env' }
    }

    const cookie = req.cookies[cookieName]
    if (!cookie) {
      logInfo(fileName, 'cookie named ' + cookieName + ' was not found')
      return { error: 'Please log in' }
    }

    try {
      const payload = (await verify(cookie, cookieSecret)) as LoginTokenPayload
      return { id: payload.id }
    } catch (error) {
      logInfo(fileName, 'verify failed')
      return { error: 'Please log in' }
    }
  } catch (error) {
    logException(fileName, error)
    return { error: '' + error }
  }
}

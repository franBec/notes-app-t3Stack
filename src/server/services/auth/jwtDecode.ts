import { verify } from './signAndVerify'

import { logError, logException } from '../logger/commonLogs'

import { NextApiRequest } from 'next'
import { LoginTokenPayload } from '../../../schemas/auth.schema'

const fileName = 'src/server/services/auth/decode'

export default async function getDecodedPayload(req: NextApiRequest) {
  try {
    const cookieName = process.env.COOKIENAME
    if (!cookieName) {
      logError(fileName, 'cookieName is undefined')
      return null
    }

    const cookieSecret = process.env.COOKIESECRET
    if (!cookieSecret) {
      logError(fileName, 'cookiesecret is undefined')
      return null
    }

    const cookie = req.cookies[cookieName]
    if (!cookie) {
      return null
    }

    try {
      const payload = (await verify(cookie, cookieSecret)) as LoginTokenPayload
      return { id: payload.id }
    } catch (error) {
      return null
    }
  } catch (error) {
    logException(fileName, error)
    return null
  }
}

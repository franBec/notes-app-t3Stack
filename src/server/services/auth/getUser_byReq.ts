import getDecodedPayload from './jwtDecode'
import { NextApiRequest } from 'next'
import { logError, logException } from '../logger/commonLogs'
import getUser_byId from './getUser_byId'
import { GetUserType } from '../../../schemas/auth.schema'

const fileName = 'src/server/services/auth/currentUser'

export default async function getUser_byReq(
  req: NextApiRequest,
): Promise<GetUserType | null> {
  try {
    const decodedPayload = await getDecodedPayload(req)
    if (!decodedPayload) {
      logError(fileName, 'getDecodedPayload returned null')
      return null
    }

    const user = await getUser_byId(decodedPayload.id)

    return user
  } catch (error) {
    logException(fileName, '' + error)
    return null
  }
}

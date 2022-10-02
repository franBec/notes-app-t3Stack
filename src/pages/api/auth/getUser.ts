import {
  handleStatus200,
  handleStatus401,
  handleStatus405,
  handleStatus500,
} from '../../../server/services/api/handleStatusXXX'

import { NextApiRequest, NextApiResponse } from 'next'

import getUser_byReq from '../../../server/services/auth/getUser_byReq'

const fileName = 'src/pages/api/auth/getUser'
const expectedMethod = 'GET'

export default async function loginApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    //check for status 405
    if (req.method !== expectedMethod)
      return res
        .status(405)
        .json(handleStatus405(fileName, expectedMethod, req.method))

    const user = await getUser_byReq(req)
    if (user) {
      return res.status(200).json(handleStatus200(user))
    }

    return res.status(401).json(handleStatus401(fileName))
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error))
  }
}

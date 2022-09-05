//https://youtu.be/T6fRWZWrJzI

import { sign } from '../../../server/services/auth/signAndVerify'
import { serialize } from 'cookie'
import { login } from '../../../server/services/auth/login'

import {
  handleStatus405,
  handleStatus500,
} from '../../../server/services/api/handleStatusXXX'
import { NextApiRequest, NextApiResponse } from 'next'
import { LoginResponseType } from '../../../schemas/login.schema'
import { LoginTokenPayload } from '../../../schemas/jwtDecode.schema'

const cookieName = process.env.COOKIENAME
const cookieSecret = process.env.COOKIESECRET

const fileName = 'src/pages/api/auth/login'
const expectedMethod = 'POST'

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

    if (!cookieName) {
      return res
        .status(500)
        .json(handleStatus500(fileName, 'cookieName is undefined'))
    }

    if (!cookieSecret) {
      return res
        .status(500)
        .json(handleStatus500(fileName, 'cookieSecret is undefined'))
    }

    //check with the database
    const loginResponse = await login(req.body)

    //credentials ok
    if (loginResponse.status === 200) {
      const user = loginResponse.data as LoginResponseType
      const payload: LoginTokenPayload = { id: user.id }
      const token = await sign(payload, cookieSecret)

      res.setHeader(
        'Set-Cookie',
        serialize(cookieName, token, {
          httpOnly: true,
          maxAge: 3600,
          sameSite: 'strict',
          path: '/',
        }),
      )

      return res.status(200).json(loginResponse)
    }

    //something was not ok
    return res.status(loginResponse.status).json(loginResponse)
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error))
  }
}

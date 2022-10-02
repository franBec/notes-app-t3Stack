//https://youtu.be/T6fRWZWrJzI

import { sign } from '../../../server/services/auth/signAndVerify'
import { serialize } from 'cookie'
import { login } from '../../../server/services/auth/login'

import {
  handleStatus200,
  handleStatus405,
  handleStatus500,
} from '../../../server/services/api/handleStatusXXX'

import { NextApiRequest, NextApiResponse } from 'next'

import {
  AuthServiceLoginType,
  LoginTokenPayload,
} from '../../../schemas/auth.schema'
import getUser_byId from '../../../server/services/auth/getUser_byId'

const cookieName = process.env.COOKIENAME
const cookieSecret = process.env.COOKIESECRET
const tokenLifeTime = process.env.TOKEN_LIFETIME

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

    //check for 500
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

    if (!tokenLifeTime) {
      return res
        .status(500)
        .json(handleStatus500(fileName, 'tokenLifeTime is undefined'))
    }
    if (typeof tokenLifeTime === 'number') {
      return res
        .status(500)
        .json(handleStatus500(fileName, 'tokenLifeTime is not a number'))
    }

    //check with the database
    const loginResponse = (await login(req.body)) as AuthServiceLoginType

    //something went wrong
    if (!loginResponse.data) {
      return res.status(loginResponse.status).json(loginResponse)
    }

    //credentials ok, lets get full info of who logged in
    //obtenemos info acerca de la persona que se logueó
    const user = await getUser_byId(loginResponse.data.id)

    //something could've been wrong
    if (!user) {
      return res
        .status(500)
        .json(
          handleStatus500(
            fileName,
            'Could not recover the user who just logged in',
          ),
        )
    }

    //armamos un token
    const payload: LoginTokenPayload = { id: loginResponse.data.id }
    const token = await sign(payload, cookieSecret)

    res.setHeader(
      'Set-Cookie',
      serialize(cookieName, token, {
        httpOnly: true,
        maxAge: Number(tokenLifeTime),
        sameSite: 'strict',
        path: '/',
      }),
    )

    return res.status(200).json(handleStatus200(user))
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error))
  }
}

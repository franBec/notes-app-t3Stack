//https://youtu.be/T6fRWZWrJzI

import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  handleStatus200,
  handleStatus400,
  handleStatus500,
} from '../../../server/services/api/handleStatusXXX'

const fileName = 'src/pages/api/auth/logout'

export default async function logoutApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const cookieName = process.env.COOKIENAME
    if (!cookieName) {
      return res
        .status(500)
        .json(handleStatus500(fileName, 'cookieName is undefined'))
    }

    const jwt = req.cookies[cookieName]

    //check for status 400
    if (!jwt) {
      return res
        .status(400)
        .json(handleStatus400(fileName, "There's no session currently active"))
    }

    res.setHeader(
      'Set-Cookie',
      serialize(cookieName, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      }),
    )

    return res.status(200).json(handleStatus200('Logout success!'))
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error))
  }
}

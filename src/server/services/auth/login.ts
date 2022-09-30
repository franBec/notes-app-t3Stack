import { prisma } from '../../db/client'

import {
  LoginRequestType,
  LoginResponseType,
} from '../../../schemas/login.schema'

import {
  handleStatus200,
  handleStatus400,
  handleStatus401,
  handleStatus500,
} from '../api/handleStatusXXX'
import { getPermissions } from './currentUser'

const fileName = 'src/server/services/auth/login'

export const login = async ({ mail, password }: LoginRequestType) => {
  try {
    if (!mail || !password) {
      return handleStatus400(fileName, 'mail and password are required')
    }

    //look for a user with provided mail
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    })

    //if not user
    if (!user) {
      return handleStatus401(fileName, 'Invalid credentials')
    }

    //if not valid password
    if (user.password !== password) {
      return handleStatus401(fileName, 'Invalid credentials')
    }

    //all ok, lets get the permissions!
    const permissions = (await getPermissions(user.id)) ?? []

    //make the data to return
    const data: LoginResponseType = {
      id: user.id,
      firstName: user.firstName,
      permissions: permissions,
    }

    return handleStatus200(data)
  } catch (error) {
    return handleStatus500(fileName, error)
  } finally {
    await prisma.$disconnect()
  }
}

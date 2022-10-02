import { LoginRequestType } from '../../../schemas/auth.schema'
import { prisma } from '../../db/client'

import {
  handleStatus200,
  handleStatus400,
  handleStatus401,
  handleStatus500,
} from '../api/handleStatusXXX'

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

    return handleStatus200({ id: user.id })
  } catch (error) {
    return handleStatus500(fileName, error)
  } finally {
    await prisma.$disconnect()
  }
}

import { prisma } from '../../db/client'
import getDecodedPayload from './jwtDecode'
import {
  GetIdType,
  GetPermissionsType,
} from '../../../schemas/currentUser.schema'
import { NextApiRequest } from 'next'
import { logError, logException } from '../logger/commonLogs'

const fileName = 'src/server/services/auth/currentUser'

export async function getId(req: NextApiRequest): Promise<GetIdType> {
  try {
    const payload = await getDecodedPayload(req)
    return payload
  } catch (error) {
    logException(fileName + '.getId()', error)
    return { error: '' + error }
  }
}

export async function getPermissions(
  req: NextApiRequest,
): Promise<GetPermissionsType> {
  try {
    const payload = await getDecodedPayload(req)
    if (!payload.id) {
      return payload
    }
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        rols: {
          include: {
            permissions: true,
          },
        },
      },
    })

    if (!user) {
      logError(fileName + '.getPermissions()', 'User not found')
      return { error: 'User not found' }
    }
    const userPermissions: string[] = []
    for (const rol of user.rols) {
      for (const permission of rol.permissions) {
        if (!userPermissions.some((it) => it === permission.name)) {
          userPermissions.push(permission.name)
        }
      }
    }

    return { permissions: userPermissions }
  } catch (error) {
    logException(fileName + '.getPermissions()', error)
    return { error: '' + error }
  } finally {
    await prisma.$disconnect()
  }
}

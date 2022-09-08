import { prisma } from '../../db/client'
import getDecodedPayload from './jwtDecode'
import { NextApiRequest } from 'next'
import { logError, logException } from '../logger/commonLogs'

const fileName = 'src/server/services/auth/currentUser'

export async function getId(req: NextApiRequest): Promise<number | null> {
  try {
    const payload = await getDecodedPayload(req)

    if (!payload || !payload.id) {
      return null
    }

    return payload.id
  } catch (error) {
    logException(fileName + '.getId()', error)
    return null
  }
}

export async function getPermissions(
  req: NextApiRequest,
): Promise<string[] | null> {
  try {
    const payload = await getDecodedPayload(req)
    if (!payload || !payload.id) {
      return null
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
      return null
    }
    const userPermissions: string[] = []
    for (const rol of user.rols) {
      for (const permission of rol.permissions) {
        if (!userPermissions.some((it) => it === permission.name)) {
          userPermissions.push(permission.name)
        }
      }
    }

    return userPermissions
  } catch (error) {
    logException(fileName + '.getPermissions()', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

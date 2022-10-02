import { GetUserType } from '../../../schemas/auth.schema'
import { prisma } from '../../db/client'
import { logError } from '../logger/commonLogs'

const fileName = 'src/server/services/auth/whoAmI'

export default async function getUser_byId(
  id: number,
): Promise<GetUserType | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
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
      throw new Error('User not found')
    }
    const userPermissions: string[] = []
    for (const rol of user.rols) {
      for (const permission of rol.permissions) {
        if (!userPermissions.some((it) => it === permission.name)) {
          userPermissions.push(permission.name)
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, rols, ...etc } = user
    const res = { ...etc, permissions: userPermissions }

    return res
  } catch (error) {
    logError(fileName, '' + error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

import { createRouter } from './context'
import { TRPCError } from '@trpc/server'

export const rolRouter = createRouter().query('findManyRol', {
  async resolve() {
    try {
      //fetch from the database
      const rols = await prisma?.rol.findMany()

      return rols
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '' + error,
        cause: error,
      })
    }
  },
})

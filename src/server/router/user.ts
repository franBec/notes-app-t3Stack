import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { signupSchema, filterAllSchema } from '../../schemas/user.schema'

export const userRouter = createRouter()
  /**
   * register a new user
   */
  .mutation('signup', {
    input: signupSchema,
    async resolve({ ctx, input }) {
      try {
        //data = input except input.repeatPassword, cause prisma panics with an unknown arg from frontend
        const { repeatPassword, ...data } = input

        //insert into the database
        const user = ctx.prisma.user.create({ data: data })

        //return
        return user
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            })
          }
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          cause: error,
        })
      }
    },
  })

  /**
   * get all users
   */
  .query('all', {
    input: filterAllSchema,

    async resolve({ input }) {
      try {
        //pagination
        const page: number = input?.page || 1

        //order by - sort by
        let orderByObject = {}
        if (input?.order) {
          orderByObject = { [input.order]: input.sort }
        }

        //fetch from the database
        return await prisma?.user.findMany({
          skip: 10 * (page - 1),
          take: 10,
          orderBy: orderByObject,
        })
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          cause: error,
        })
      }
    },
  })

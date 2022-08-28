import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { signupSchema } from '../../schemas/user.schema'

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
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            })
          }
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          cause: e,
        })
      }
    },
  })

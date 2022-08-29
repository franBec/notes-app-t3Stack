import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { env } from '../../env/server.mjs'

import { SignupSchema } from '../../schemas/user.schema'
import { RequestSchema, MetadataType } from '../../schemas/_pagination'

export const userRouter = createRouter()
  /**
   * register a new user
   */
  .mutation('signup', {
    input: SignupSchema,
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
          message: '' + error,
          cause: error,
        })
      }
    },
  })

  /**
   * get all users
   */
  .query('all', {
    input: RequestSchema,

    async resolve({ input }) {
      try {
        //pagination
        const page = input?.page || 1
        const rowsByPage = Number(env.DEFAULT_ROWS_BY_PAGE) ?? 10

        //order by - sort by
        let orderByObject = {}
        if (input?.order) {
          orderByObject = { [input.order]: input.sort }
        }

        //fetch from the database
        const users = await prisma?.user.findMany({
          skip: rowsByPage * (page - 1),
          take: rowsByPage,
          orderBy: orderByObject,
        })

        //send back metadata that might be useful
        const metadata: MetadataType = {
          totalRows: (await prisma?.user.count()) ?? 0,
          rowsByPage: rowsByPage,
          currentPage: page,
        }

        return { users, metadata }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '' + error,
          cause: error,
        })
      }
    },
  })

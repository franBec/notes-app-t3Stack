import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { env } from '../../env/server.mjs'

import { CreateUserSchema, EditUserSchema } from '../../schemas/user.schema'
import {
  PaginationRequestSchema,
  PaginationResponseType,
} from '../../schemas/_pagination'

export const userRouter = createRouter()
  .mutation('createOneUser', {
    input: CreateUserSchema,
    async resolve({ ctx, input }) {
      try {
        //data = input except input.repeatPassword, cause prisma panics with an unknown arg from frontend
        //I had to make the linter ignore this line cause couldn't find another way to delete the repeatPassword property
        //https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword: _, ...data } = input

        //insert into the database
        await ctx.prisma.user.create({ data: data })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Mail already taken',
              cause: error,
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

  .query('findManyUser', {
    input: PaginationRequestSchema,

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
          include: {
            rols: true,
          },
        })

        //send back metadata that might be useful
        const metadata: PaginationResponseType = {
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

  .mutation('updateOneUser', {
    input: EditUserSchema,
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.user.update({
          where: { id: input.id },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            mail: input.mail,
            rols: {
              set: input.rols,
            },
          },
        })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Mail already taken',
              cause: error,
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

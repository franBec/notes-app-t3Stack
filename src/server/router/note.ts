import { prisma } from '../db/client'
import { createRouter } from './context'

import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const noteRouter = createRouter()
  .query('all', {
    async resolve() {
      try {
        return prisma.note.findMany()
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '' + error,
          cause: error,
        })
      }
    },
  })

  .query('byId', {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      try {
        const { id } = input
        const note = await prisma.note.findUnique({
          where: { id },
        })
        if (!note) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No post with id '${id}'`,
          })
        }
        return note
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '' + error,
          cause: error,
        })
      }
    },
  })

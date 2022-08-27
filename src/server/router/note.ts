import { prisma } from "../db/client"
import { createRouter } from "./context"

import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const noteRouter = createRouter()

  .query('all', {
    async resolve() {
      return prisma.note.findMany()
    },
  })

  .query('byId',{
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const { id } = input
      const note = await prisma.note.findUnique({
        where: {id}
      })
      if(!note){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`
        })
      }
      return note
    },
  })
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '../db/client'

import getUser_byReq from '../services/auth/getUser_byReq'

import { permissions } from '../services/auth/shield'

/**
 * When the front makes a request, this makes a context so the backend knows stuff such as
 *    AUTH: who is making the request and have permissions to do so
 *    CONNECTION: the database connection
 */
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  let user = null

  const req = opts?.req

  //if request exists, let try to get the current logged user, and its permissions
  if (req) {
    user = await getUser_byReq(req)
  }

  return {
    user, //current logged user or null
    prisma, //the prisma connection is always part of the context
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

//export the context so the server router and the api handler can use it
export const createRouter = () => trpc.router<Context>().middleware(permissions)

import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '../db/client'

import { getId, getPermissions } from '../../server/services/auth/currentUser'

import { permissions } from '../services/auth/shield'

/**
 * When the front makes a request, this makes a context so the backend knows stuff such as
 *    AUTHENTICATION: who is making the request
 *    AUTHORIZATION: does the user making the request have permissions to do so
 *    CONNECTION: the database connection
 */
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  let userId = null
  let userPermissions = null

  const req = opts?.req

  //if request exists, let try to get the current logged user, and its permissions
  if (req) {
    userId = await getId(req)
    if (userId) {
      userPermissions = await getPermissions(userId)
    }
  }

  return {
    userId, //current logged user id or null
    userPermissions, //current logged user permissions (can be empty), or null
    prisma, //the prisma connection is always part of the context
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

//export the context so the server router and the api handler can use it
export const createRouter = () => trpc.router<Context>().middleware(permissions)

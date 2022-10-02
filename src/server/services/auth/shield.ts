import { TRPCError } from '@trpc/server'
import { rule, shield, and } from 'trpc-shield'
import { IFallbackErrorType } from 'trpc-shield/lib/types'

/**
 * true/false if user is logged in
 */
const isAuthenticated = rule()(async (ctx) => {
  return ctx.user !== null
})

/**
 * Auditor action: can see the list of users
 */
const canSeeUsersList = rule()(async (ctx) => {
  return ctx.user.permissions.includes('QUERY_USER_findManyUser')
})

/**
 * Admin action: can edit a user
 */
const canEditUser = rule()(async (ctx) => {
  return ctx.user.permissions.includes('MUTATION_USER_updateOneUser')
})

export const permissions = shield(
  {
    query: {
      findManyNote: isAuthenticated,

      findManyRol: and(isAuthenticated, canSeeUsersList),

      findManyUser: and(isAuthenticated, canSeeUsersList),
    },
    mutation: {
      updateOneUser: and(isAuthenticated, canEditUser),
    },
  },
  {
    fallbackError: new TRPCError({
      code: 'FORBIDDEN',
      message: "You don't have permissions to access the requested resource",
    }) as IFallbackErrorType,
  },
)

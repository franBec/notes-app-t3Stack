import { TRPCError } from '@trpc/server'
import { rule, shield, and } from 'trpc-shield'

/**
 * true/false if user is logged in
 */
const isAuthenticated = rule()(async (ctx) => {
  return ctx.userId !== null
})

/**
 * Auditor action: can see the list of users
 */
const canSeeUsersList = rule()(async (ctx) => {
  return ctx.userPermissions.includes('QUERY_USER_findManyUser')
})

/**
 * Admin action: can edit a user
 */
const canEditUser = rule()(async (ctx) => {
  return ctx.userPermissions.includes('MUTATION_USER_updateOneUser')
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
    }),
  },
)

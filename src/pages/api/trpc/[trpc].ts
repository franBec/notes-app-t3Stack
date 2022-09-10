// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { prisma } from '../../../server/db/client'
import { appRouter } from '../../../server/router'
import { createContext } from '../../../server/router/context'
import logger from '../../../server/services/logger'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prisma.$disconnect(),

  onError({ error }) {
    logger.error('Error:', error)
  },
})

// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { noteRouter } from './note'
import { userRouter } from './user'
import { rolRouter } from './rol'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('note.', noteRouter)
  .merge('user.', userRouter)
  .merge('rol.', rolRouter)

// export type definition of API
export type AppRouter = typeof appRouter

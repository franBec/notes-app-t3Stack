// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { noteRouter } from "./note";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("note.", noteRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import z from 'zod'
import { PaginationResponseSchema } from './pagination.schema'

/**
 * Garantia de que siempre el backend (mas especificamente el service) responde algo con esta estructura
 */
export const ApiResponseSchema = z.object({
  status: z.number(),
  message: z.string().nullish(),
  data: z.unknown().nullish(),
  metadata: PaginationResponseSchema.nullish(),
})

/**
 * Garantia de que siempre el backend (mas especificamente el service) responde algo con esta estructura
 */
export type ApiResponse = z.infer<typeof ApiResponseSchema>

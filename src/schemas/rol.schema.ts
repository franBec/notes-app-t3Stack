import z from 'zod'

/**
 * Used by src/schemas/user.schema.ts as part of its EditUserSchema
 */
export const RolSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type RolType = z.infer<typeof RolSchema>

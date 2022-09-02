import z from 'zod'

/**
 * Used by src/schemas/user.schema.ts as part of its EditUserSchema
 */
export const RolSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  mail: z.string().email(),
})

export type EditUserType = z.infer<typeof RolSchema>

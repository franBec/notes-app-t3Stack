import z from 'zod'
import { RolSchema } from './rol.schema'

/**
 * Minimal definition of a user
 */

const UserSchema = z.object({
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

/**
 * Used by:
 *  signup form in src/pages/signup
 *  create mutation in src/server/router/user
 */

export const CreateUserSchema = UserSchema.extend({
  password: z
    .string()
    .min(8, { message: 'At least 8 characters' })
    .max(127, { message: 'At most 127 characters' }),
  repeatPassword: z
    .string()
    .min(8, { message: 'At least 8 characters' })
    .max(127, { message: 'At most 127 characters' }),
})

export type CreateUserType = z.infer<typeof CreateUserSchema>

/**
 * Used by:
 *  form in src/components/users/form
 *  edit mutation in src/server/router/user
 */

//temporal fix
export const EditUserSchema = UserSchema.extend({
  id: z.number(),
  rols: z.array(RolSchema),
})
// export const EditUserSchema = UserSchema
export type EditUserType = z.infer<typeof EditUserSchema>

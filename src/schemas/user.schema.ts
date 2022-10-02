import z from 'zod'
import { MainSchema } from './main.schema'
import { RolSchema } from './rol.schema'

export const UserSchema = MainSchema.extend({
  firstName: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  mail: z.string().email(),
  password: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(127, { message: 'At most 127 characters' }),

  //has many...
  rols: RolSchema.array(),
})
export type UserType = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({
  created: true,
  id: true,
  modified: true,
  rols: true,
}).extend({
  repeatPassword: z.string(),
})
export type CreateUserType = z.infer<typeof CreateUserSchema>

export const EditUserSchema = UserSchema.omit({
  created: true,
  modified: true,
  password: true,
}).merge(
  z.object({
    rols: RolSchema.omit({ permissions: true }).array(),
  }),
)
export type EditUserType = z.infer<typeof EditUserSchema>

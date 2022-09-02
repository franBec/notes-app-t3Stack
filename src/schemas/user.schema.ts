import z from 'zod'

//used by the sign up form in /signup
export const CreateUserSchema = z.object({
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
    .min(8, { message: 'At least 8 characters' })
    .max(127, { message: 'At most 127 characters' }),
  repeatPassword: z
    .string()
    .min(8, { message: 'At least 8 characters' })
    .max(127, { message: 'At most 127 characters' }),
})

export type CreateUserType = z.infer<typeof CreateUserSchema>

//used by the edit modal in /users
export const EditUserSchema = z.object({
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

export type EditUserType = z.infer<typeof EditUserSchema>

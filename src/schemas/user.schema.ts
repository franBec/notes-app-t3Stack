import z from 'zod'
import { sortEnum } from './sortEnum'

//used by the sign up form in /signup
export const signupSchema = z.object({
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

//used by the table in /users
export const filterAllSchema = z
  .object({
    page: z.number().nullish(),
    order: z.string().nullish(),
    sort: z.nativeEnum(sortEnum).nullish(),
  })
  .nullish()

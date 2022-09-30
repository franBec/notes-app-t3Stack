import z from 'zod'

/**
 * Client request when loggin in
 */
export const LoginRequest = z.object({
  mail: z.string().email(),
  password: z.string().min(1, { message: 'Required' }),
})

export type LoginRequestType = z.infer<typeof LoginRequest>

/**
 * Response from src/server/services/auth/login.ts
 */
export const LoginResponse = z.object({
  id: z.number(),
  firstName: z.string(),
  permissions: z.array(z.string()),
})

export type LoginResponseType = z.infer<typeof LoginResponse>

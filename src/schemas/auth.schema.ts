import z from 'zod'
import { JWTPayload } from 'jose'

import { UserSchema } from './user.schema'
import { ApiResponseSchema } from './api.schema'
import { MainSchema } from './main.schema'

/* ---- api/auth/login ---- */

//request
export const LoginRequestSchema = UserSchema.pick({
  mail: true,
  password: true,
})
export type LoginRequestType = z.infer<typeof LoginRequestSchema>

//contrato temporal entre service y api, el frontend no ve esto
export const AuthServiceLoginSchema = ApiResponseSchema.merge(
  z.object({
    data: MainSchema.pick({ id: true }).nullish(),
  }),
).omit({ metadata: true })
export type AuthServiceLoginType = z.infer<typeof AuthServiceLoginSchema>

//la data que forma parte de LoginRequestSchema
export const GetUserSchema = UserSchema.omit({
  password: true,
  rols: true,
}).extend({ permissions: z.string().array() })
export type GetUserType = z.infer<typeof GetUserSchema>

//response
export const LoginResponseSchema = ApiResponseSchema.omit({
  metadata: true,
}).merge(
  z.object({
    data: GetUserSchema,
  }),
)
export type LoginResponseType = z.infer<typeof LoginResponseSchema>

/* ---- api/auth/logout ---- */

//request
/* no requiere parametros de entrada, usa las cookies de NextApiRequest */

//response
export const LogoutResponseSchema = ApiResponseSchema
export type LogoutResponseType = z.infer<typeof LogoutResponseSchema>

/* ---- api/auth/getUser ---- */
//request: is the cookie in req.cookies

//response
export const GetUserApiResponseSchema = ApiResponseSchema.omit({
  metadata: true,
}).merge(
  z.object({
    data: GetUserSchema.nullish(),
  }),
)
export type GetUserApiResponse = z.infer<typeof GetUserApiResponseSchema>

/* ---- LoginTokenPayload ---- */
/**
 * Se extiende de JWTPayload para dar a entender que el payload contiene una ID numerica
 */
export interface LoginTokenPayload extends JWTPayload {
  id: number
}

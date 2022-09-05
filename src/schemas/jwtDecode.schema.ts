import { JWTPayload } from 'jose'

export interface LoginTokenPayload extends JWTPayload {
  id?: number
  error?: string
}

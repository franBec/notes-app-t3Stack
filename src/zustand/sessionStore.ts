import create from 'zustand'
import { GetUserType } from '../schemas/auth.schema'

interface SessionState {
  session: GetUserType | undefined
  setSession: (session: GetUserType | undefined) => void
}

export const useSession = create<SessionState>()((set) => ({
  session: undefined,
  setSession: (session) => set(() => ({ session })),
}))

import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { LoginResponseType } from '../schemas/login.schema'

interface SessionState {
  session: LoginResponseType | undefined
  setSession: (session: LoginResponseType | undefined) => void
}

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        session: undefined,
        setSession: (session) => set(() => ({ session })),
      }),
      {
        name: 'session-storage',
      },
    ),
  ),
)

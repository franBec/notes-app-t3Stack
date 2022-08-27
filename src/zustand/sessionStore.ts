import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UsernameState {
  username: string | null
  setUsername: (name: string | null) => void
}

export const useUsername = create<UsernameState>()(
  devtools(
    persist(
      (set) => ({
        username: null,
        setUsername: (name) => set((state) => ({ username: name })),
      }),
      {
        name: 'username-storage',
      },
    ),
  ),
)

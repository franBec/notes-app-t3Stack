import create from 'zustand'

interface LoadingState {
  get_isLoading: boolean
  set_isLoading: (boo: boolean) => void
}

/**
 *Controls a blocking animation overlay cause something important is going on
 */
export const useLoading = create<LoadingState>((set) => ({
  get_isLoading: false,
  set_isLoading: (boo) => set(() => ({ get_isLoading: boo })),
}))

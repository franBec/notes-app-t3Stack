/**
 * Here is stored the ability to refetch data
 *
 * Example scenario
 *    your main component fetch data
 *    but you have a form down the line that
 *    when success want to refetch all
 *
 * Even tho this is meant to store a refetcher
 * really this can store any function, it is too generic
 */

import create from 'zustand'

interface RefetchState {
  getRefetch: (() => unknown) | undefined
  setRefetch: (refetch: (() => unknown) | undefined) => void
}

export const useRefetch = create<RefetchState>((set) => ({
  getRefetch: undefined,
  setRefetch: (refetch) => set(() => ({ getRefetch: refetch })),
}))

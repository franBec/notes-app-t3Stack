import create from 'zustand'
import {
  PaginationRequestType,
  PaginationResponseType,
  SortEnum,
} from '../schemas/_pagination'

//REQUEST
interface PaginationRequestState {
  getPaginationRequest: PaginationRequestType
  setPaginationRequest: (obj: PaginationRequestType) => void
}

export const usePaginationRequest = create<PaginationRequestState>((set) => ({
  getPaginationRequest: { order: 'id', page: 1, sort: SortEnum.desc },
  setPaginationRequest: (obj) => set(() => ({ getPaginationRequest: obj })),
}))

//RESPONSE
interface PaginationResponseState {
  getPaginationResponse: PaginationResponseType
  setPaginationResponse: (obj: PaginationResponseType) => void
}

export const usePaginationResponse = create<PaginationResponseState>((set) => ({
  getPaginationResponse: { currentPage: 0, rowsByPage: 0, totalRows: 0 },
  setPaginationResponse: (obj) => set(() => ({ getPaginationResponse: obj })),
}))

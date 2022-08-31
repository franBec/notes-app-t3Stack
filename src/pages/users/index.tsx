import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'
import { SortEnum, PaginationRequestType } from '../../schemas/_pagination'

import { useState } from 'react'

import Table from '../../components/users/table/table'

import LoadingScreen from '../../components/utils/loading/loadingScreen'
import ErrorComponent from '../../components/utils/errors/errorComponent'

import {
  usePaginationRequest,
  usePaginationResponse,
} from '../../zustand/paginationStore'

const Index = () => {
  const getPaginationRequest = usePaginationRequest(
    (state) => state.getPaginationRequest,
  )
  const setPaginationResponse = usePaginationResponse(
    (state) => state.setPaginationResponse,
  )

  const trpcQuery = trpc.useQuery(['user.all', getPaginationRequest])
  const { refetch } = trpcQuery
  return (
    <>
      <button
        onClick={(e) => {
          refetch()
        }}
      >
        Refetch!
      </button>
      <DefaultQueryCell
        query={trpcQuery}
        loading={() => <LoadingScreen />}
        success={({ data }) => {
          setPaginationResponse(data.metadata)

          return (
            <>
              <Table data={data.users} />
            </>
          )
        }}
        error={({ error }) => <ErrorComponent message={error.toString()} />}
      />
    </>
  )
}

export default Index

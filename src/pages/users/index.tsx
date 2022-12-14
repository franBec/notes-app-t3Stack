import { trpc } from '../../utils/trpc'

import Table from '../../components/users/table/table'

import LoadingScreen from '../../components/utils/loading/loadingScreen'

import {
  usePaginationRequest,
  usePaginationResponse,
} from '../../zustand/paginationStore'

import { useRefetch } from '../../zustand/refetchStore'

const Index = () => {
  //pagination stuff
  const getPaginationRequest = usePaginationRequest(
    (state) => state.getPaginationRequest,
  )
  const setPaginationResponse = usePaginationResponse(
    (state) => state.setPaginationResponse,
  )

  //go fetch some data
  const { isLoading, isError, error, data, refetch } = trpc.useQuery([
    'user.findManyUser',
    getPaginationRequest,
  ])

  //add refetch to a store, so can be used for anyone down the road if data needs to be refetched
  const setRefetch = useRefetch((state) => state.setRefetch)

  //renders!

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isError) {
    throw new Error(error.message)
  }

  if (data) {
    setPaginationResponse(data.metadata)
    setRefetch(refetch)

    return <Table data={data.users} />
  }
}

export default Index

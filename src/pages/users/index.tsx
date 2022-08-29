import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'
import { SortEnum, RequestType } from '../../schemas/_pagination'

import { useState } from 'react'

import Table from '../../components/users/table'

import LoadingScreen from '../../components/utils/loading/loadingScreen'
import ErrorComponent from '../../components/utils/errors/errorComponent'

const Index = () => {
  const [filters, setFilters] = useState<RequestType>({
    page: 1,
    order: 'id',
    sort: SortEnum.asc,
  })
  return (
    <>
      <DefaultQueryCell
        query={trpc.useQuery(['user.all', filters])}
        loading={() => <LoadingScreen />}
        success={({ data }) => (
          <>
            <Table
              data={data.users}
              metadata={data.metadata}
              setFilters={setFilters}
            />
          </>
        )}
        error={({ error }) => <ErrorComponent message={error.toString()} />}
      />
    </>
  )
}

export default Index

import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'
import { SortEnum, RequestType } from '../../schemas/_pagination'

import { useState } from 'react'
import UsersTable from '../../components/users/table'

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
        loading={() => <p>Loading stuff...</p>}
        success={({ data }) => (
          <UsersTable
            data={data.users}
            metadata={data.metadata}
            setFilters={setFilters}
          />
        )}
        error={({ error }) => <ErrorComponent message={error.toString()} />}
      />
    </>
  )
}

export default Index

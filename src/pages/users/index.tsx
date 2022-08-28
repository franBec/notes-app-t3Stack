import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'
import { sortEnum } from '../../schemas/sortEnum'

import { useState } from 'react'
import UsersTable from '../../components/users/table'

import ErrorComponent from '../../components/utils/errors/errorComponent'

const Index = () => {
  const [filters, setFilters] = useState({
    page: 1,
    order: 'id',
    sort: sortEnum.asc,
  })
  return (
    <>
      <DefaultQueryCell
        query={trpc.useQuery(['user.all', filters])}
        loading={() => <p>Loading stuff...</p>}
        success={({ data }) => (
          <UsersTable data={data} setFilters={setFilters} />
        )}
        error={({ error }) => <ErrorComponent message={error.toString()} />}
      />
    </>
  )
}

export default Index

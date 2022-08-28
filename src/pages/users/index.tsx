import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'

import { sortEnum } from '../../schemas/sortEnum'

import { useState } from 'react'

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
        loading={() => <p>Loading...</p>}
        success={({ data }) => <>{JSON.stringify(data, null, 4)}</>}
      />
    </>
  )
}

export default Index

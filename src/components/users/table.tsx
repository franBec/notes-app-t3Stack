import { User } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import { sortEnum } from '../../schemas/sortEnum'

const UsersTable = ({
  data,
  setFilters,
}: {
  data: User[] | undefined
  setFilters: Dispatch<
    SetStateAction<{
      page: number
      order: string
      sort: sortEnum
    }>
  >
}) => {
  return <>{JSON.stringify(data, null, 4)}</>
}

export default UsersTable

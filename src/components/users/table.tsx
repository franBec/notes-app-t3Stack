import { User } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

import { SortEnum, RequestType, MetadataType } from '../../schemas/_pagination'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const UsersTable = ({
  data,
  metadata,
  setFilters,
}: {
  data: User[] | undefined
  metadata: MetadataType
  setFilters: Dispatch<SetStateAction<RequestType>>
}) => {
  //react-table gets angry if I do not return when data is empty
  if (!data) {
    return <p>No data here, srry</p>
  }

  //react-table
  const columnHelper = createColumnHelper<User>()
  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Id</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('created', {
      header: () => <span>Created</span>,
      cell: (info) => info.getValue().toLocaleDateString(),
    }),
    columnHelper.accessor('firstName', {
      header: () => <span>First Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: () => <span>Last Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('mail', {
      header: () => <span>Mail</span>,
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  //render
  return (
    <div className="p-2">
      <table>
        <thead className="text-white bg-gray-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
              <th className="p-2 border-2">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="p-2 even:bg-gray-100 odd:bg-blue-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="p-2 border-2">Some action/s here</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable

import { User, Rol } from '@prisma/client'
import PaginateNavbar from '../../utils/pagination/paginateNavbar'
import Actions from './actions/_actions'

const Table = ({
  data,
}: {
  data:
    | (User & {
        rols: Rol[]
      })[]
    | undefined
}) => {
  if (!data) {
    return <p>Srry, no data</p>
  }

  const renderTable = () => (
    <table>
      <thead className="text-white bg-gray-500">
        <tr>
          <th className="p-2 border-2">Id</th>
          <th className="p-2 border-2">Created</th>
          <th className="p-2 border-2">First Name</th>
          <th className="p-2 border-2">Last Name</th>
          <th className="p-2 border-2">Mail</th>
          <th className="p-2 border-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((it) => (
          <tr key={it.id} className="p-2 even:bg-gray-100 odd:bg-blue-100">
            <td className="p-2 border-2">{it.id}</td>
            <td className="p-2 border-2">{it.created.toLocaleDateString()}</td>
            <td className="p-2 border-2">{it.firstName}</td>
            <td className="p-2 border-2">{it.lastName}</td>
            <td className="p-2 border-2">{it.mail}</td>
            <td className="p-2 border-2">
              <Actions user={it} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="space-y-4">
      <div>{renderTable()}</div>
      <div>
        <PaginateNavbar />
      </div>
    </div>
  )
}

export default Table

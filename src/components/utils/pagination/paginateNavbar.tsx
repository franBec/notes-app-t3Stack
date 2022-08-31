import Arrows from './arrows'
import { FaGripLinesVertical } from 'react-icons/fa'
import { usePaginationResponse } from '../../../zustand/paginationStore'

const PaginateNavbar = () => {
  const getPaginationResponse = usePaginationResponse(
    (state) => state.getPaginationResponse,
  )
  const { currentPage, rowsByPage, totalRows } = getPaginationResponse
  const totalPages = Math.ceil(totalRows / rowsByPage)

  return (
    <nav className="w-fit bg-gray-500 flex flex-row items-center space-x-2 text-white p-2 rounded">
      <div>
        <Arrows />
      </div>
      <div>
        <FaGripLinesVertical className="text-xl text-white" />
      </div>
      <div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      {/* <div>
        <FaGripLinesVertical className="text-xl text-white" />
      </div> */}
    </nav>
  )
}

export default PaginateNavbar

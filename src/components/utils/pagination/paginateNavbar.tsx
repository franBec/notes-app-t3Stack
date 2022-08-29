import { Dispatch, SetStateAction } from 'react'
import { MetadataType, RequestType } from '../../../schemas/_pagination'

import Arrows from './arrows'

import { FaGripLinesVertical } from 'react-icons/fa'

const PaginateNavbar = ({
  metadata,
  updateMetadata,
}: {
  metadata: MetadataType
  updateMetadata: Dispatch<SetStateAction<RequestType>>
}) => {
  const { currentPage, rowsByPage, totalRows } = metadata
  const totalPages = Math.ceil(totalRows / rowsByPage)

  return (
    <nav className="w-fit bg-gray-500 flex flex-row items-center space-x-2 text-white p-2 rounded">
      <div>
        <Arrows metadata={metadata} updateMetadata={updateMetadata} />
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

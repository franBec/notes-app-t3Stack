import { Dispatch, SetStateAction } from 'react'
import { MetadataType, RequestType } from '../../schemas/_pagination'
import ArrowIcon, { ArrowEnum } from './arrowIcon'

const Arrows = ({
  metadata,
  updateMetadata,
}: {
  metadata: MetadataType
  updateMetadata: Dispatch<SetStateAction<RequestType>>
}) => {
  const { currentPage, rowsByPage, totalRows } = metadata
  const totalPages = Math.ceil(totalRows / rowsByPage)

  const handleArrowClick = (type: ArrowEnum) => {
    switch (type) {
      case ArrowEnum.fastBack:
        updateMetadata({ ...metadata, page: 1 })
        break

      case ArrowEnum.back:
        currentPage > 1 &&
          updateMetadata({ ...metadata, page: currentPage - 1 })
        break

      case ArrowEnum.forward:
        currentPage < totalPages &&
          updateMetadata({ ...metadata, page: currentPage + 1 })
        break

      case ArrowEnum.fastForward:
        updateMetadata({ ...metadata, page: totalPages })
        break
    }
  }
  return (
    <ul className="inline-flex space-x-2">
      <div onClick={(e) => handleArrowClick(ArrowEnum.fastBack)}>
        <ArrowIcon type={ArrowEnum.fastBack} />
      </div>
      <div onClick={(e) => handleArrowClick(ArrowEnum.back)}>
        <ArrowIcon type={ArrowEnum.back} />
      </div>
      <div onClick={(e) => handleArrowClick(ArrowEnum.forward)}>
        <ArrowIcon type={ArrowEnum.forward} />
      </div>
      <div onClick={(e) => handleArrowClick(ArrowEnum.fastForward)}>
        <ArrowIcon type={ArrowEnum.fastForward} />
      </div>
    </ul>
  )
}

export default Arrows

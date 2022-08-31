import ArrowIcon from './arrowIcon'

import {
  usePaginationRequest,
  usePaginationResponse,
} from '../../../zustand/paginationStore'

export enum ArrowEnum {
  'fastBack' = 'fastBack', //<<
  'back' = 'back', //<
  'forward' = 'forward', //>
  'fastForward' = 'fastForward', //>>
}

const Arrows = () => {
  const getPaginationResponse = usePaginationResponse(
    (state) => state.getPaginationResponse,
  )
  const setPaginationRequest = usePaginationRequest(
    (state) => state.setPaginationRequest,
  )

  const { currentPage, rowsByPage, totalRows } = getPaginationResponse
  const totalPages = Math.ceil(totalRows / rowsByPage)

  const handleArrowClick = (type: ArrowEnum) => {
    switch (type) {
      case ArrowEnum.fastBack:
        setPaginationRequest({ ...getPaginationResponse, page: 1 })
        break

      case ArrowEnum.back:
        currentPage > 1 &&
          setPaginationRequest({
            ...getPaginationResponse,
            page: currentPage - 1,
          })
        break

      case ArrowEnum.forward:
        currentPage < totalPages &&
          setPaginationRequest({
            ...getPaginationResponse,
            page: currentPage + 1,
          })
        break

      case ArrowEnum.fastForward:
        setPaginationRequest({ ...getPaginationResponse, page: totalPages })
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

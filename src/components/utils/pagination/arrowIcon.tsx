import { FaLessThan } from 'react-icons/fa'
import { ArrowEnum } from './arrows'

const ArrowIcon = ({ type }: { type: ArrowEnum }) => {
  const renderIcon = () => {
    const style = `flex flex-row ${
      (type === ArrowEnum.forward || type === ArrowEnum.fastForward) &&
      'rotate-180'
    }`

    return (
      <div className={style}>
        <FaLessThan />
        {(type === ArrowEnum.fastBack || type === ArrowEnum.fastForward) && (
          <FaLessThan />
        )}
      </div>
    )
  }

  return (
    <li
      className={
        'py-2 px-3 leading-tight bg-gray-400 hover:bg-gray-600 text-xs rounded-lg cursor-pointer'
      }
    >
      {renderIcon()}
    </li>
  )
}

export default ArrowIcon

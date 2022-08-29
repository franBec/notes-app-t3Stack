import { FaStickyNote } from 'react-icons/fa'

export enum TextColorsEnum {
  'white' = 'text-white',
  'gray' = 'text-gray-500',
}

const PulsatingNote = ({ textColor }: { textColor: TextColorsEnum }) => {
  const style = `animate-pulse flex flex-col space-y-2 text-5xl justify-center ${textColor}`
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto">
      <div className={style}>
        <div className="flex justify-center">
          <FaStickyNote />
        </div>
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default PulsatingNote

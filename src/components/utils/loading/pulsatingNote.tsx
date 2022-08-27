import { FaStickyNote } from 'react-icons/fa'

const PulsatingNote = () => {
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-2 text-5xl text-gray-200 justify-center">
        <div className="flex justify-center">
          <FaStickyNote />
        </div>
        <div>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default PulsatingNote

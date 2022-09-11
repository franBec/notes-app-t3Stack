import { BiError } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'

import { useRouter } from 'next/router'

const ErrorPage = ({ error }: { error: Error }) => {
  const router = useRouter()

  const handleClick = () => {
    router
      .replace({
        pathname: '/',
      })
      .then(() => router.reload())
  }

  return (
    <div className="flex justify-center flex-col items-center h-full space-y-8">
      <div className="flex flex-col items-center">
        <div>
          <BiError className="text-5xl" />
        </div>
        <div>
          <p className="font-bold text-xl">Something went wrong...</p>
        </div>
      </div>
      <div>
        <p>
          Error: <span className="italic">{error.message}</span>
        </p>
      </div>
      <div>
        <button
          className="border-2 drop-shadow-xl border-black"
          onClick={handleClick}
        >
          <div className="py-1 px-2  flex flex-row items-center space-x-2">
            <p>Go back home</p>
            <FaHome />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage

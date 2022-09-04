import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { ApiResponse } from '../../schemas/api.schema'

const Logout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    toast.promise(toastLogout(), {
      loading: 'Logging out...',
      success: <b>Logged out!</b>,
      error: <b>Something went wrong</b>,
    })

    /*
      let's force hard refresh to '/', so
        -> triggers getServerSideProps of index.jsx
        -> sessionData.loggedIn is now false
        -> login.jsx is mounted
        -> its useEffect will clean up the username from the zustand store
    */
    router
      .replace({
        pathname: '/',
      })
      .then(() => router.reload())
  }

  const toastLogout = async () => {
    const res = await fetch('/api/auth/logout')
    const resjson = (await res.json()) as ApiResponse
    if (resjson.status !== 200) {
      console.error(resjson.message)
      throw new Error(resjson.message)
    }
  }

  return (
    <button onClick={handleLogout}>
      <div className="flex flex-row items-center space-x-2 text-xl">
        <span>Logout</span>
        <RiLogoutBoxRFill />
      </div>
    </button>
  )
}

export default Logout

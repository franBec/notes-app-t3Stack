import Link from 'next/link'
import Logout from './logout'

import { useEffect, useState } from 'react'
import { useUsername } from '../../zustand/sessionStore'

const Header = () => {
  //useState & useEffect of username, to prevent hydration error
  const username = useUsername((state) => state.username)
  const [getUsername, setUsername] = useState()

  useEffect(() => {
    setUsername(username)
  }, [username])

  return (
    <header className="bg-gray-500 h-12">
      <div className="h-full flex p-4 items-center justify-between text-white">
        <div>
          <Link href="/">
            <a className="text-xl">
              Notes App{getUsername && ` | ${getUsername}'s Notes`}
            </a>
          </Link>
        </div>
        <div>{getUsername && <Logout />}</div>
      </div>
    </header>
  )
}

export default Header

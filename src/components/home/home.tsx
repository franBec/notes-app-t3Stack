import { useState, useEffect } from 'react'

import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons'

import { useUsername } from '../../zustand/sessionStore'

import HomeCard from './homeCard'

const Home = ({ permissions }: { permissions: string[] }) => {
  //useState & useEffect of username, to prevent hydration error
  const username = useUsername((state) => state.username)
  const [getUsername, setUsername] = useState<string | null>()

  useEffect(() => {
    setUsername(username)
  }, [username])

  return (
    <div className="space-y-4">
      <p className="text-center font-bold text-3xl">Hello {getUsername}!</p>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-8 place-content-center">
          <HomeCard
            icon={faStickyNote}
            link="/myNotes"
            title="Go to My Notes"
          />
          <HomeCard
            icon={faArchive}
            link="/archivedNotes"
            title="Go to Archived Notes"
          />
          {permissions.includes('DASHBOARD_SEE') && (
            <HomeCard icon={faGaugeHigh} link="/dashboard" title="Dashboard" />
          )}
        </div>
      </div>
      <p className="text-center italic">
        You can logout from the top right corner
      </p>
    </div>
  )
}

export default Home

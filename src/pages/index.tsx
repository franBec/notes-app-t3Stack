import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import HomeCard from '../components/home/homeCard'
import { useSession } from '../zustand/sessionStore'

const Home = () => {
  const session = useSession((state) => state.session)

  return (
    <div className="space-y-4">
      <p className="text-center font-bold text-3xl">
        Hello {session?.firstName}!
      </p>

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
          {session?.permissions.includes('QUERY_USER_findManyUser') && (
            <HomeCard icon={faUsers} link="/users" title="Users" />
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

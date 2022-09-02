import { User, Rol } from '@prisma/client'
import ActionEdit from './actionEdit'

const Actions = ({
  user,
}: {
  user: User & {
    rols: Rol[]
  }
}) => {
  return (
    <div className="flex justify-around items-center">
      {/* <ActionRead /> */}
      <ActionEdit user={user} />
    </div>
  )
}

export default Actions

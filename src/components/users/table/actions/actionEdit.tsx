import { User, Rol } from '@prisma/client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import SimpleModal from '../../../utils/modal/modal'
import UserForm from '../../form/userForm'

const ActionEdit = ({
  user,
}: {
  user: User & {
    rols: Rol[]
  }
}) => {
  const [showModal, setShowModal] = useState(false)

  const renderModal = () => {
    return (
      <SimpleModal modalTitle="Edit User" setShowModal={setShowModal}>
        <UserForm user={user} setShowModal={setShowModal} />
      </SimpleModal>
    )
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <FaPencilAlt />
      </button>
      {showModal && renderModal()}
    </>
  )
}

export default ActionEdit

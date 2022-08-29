import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import SimpleModal from '../../../utils/modal/modal'
import UserForm from '../../form/userForm'

const ActionEdit = () => {
  const [showModal, setShowModal] = useState(false)

  const renderModal = () => {
    return (
      <SimpleModal
        modalTitle="Testing"
        setShowModal={setShowModal}
        children={<UserForm />}
      />
    )
  }
  return (
    <>
      <button onClick={(e) => setShowModal(true)}>
        <FaPencilAlt />
      </button>
      {showModal && renderModal()}
    </>
  )
}

export default ActionEdit

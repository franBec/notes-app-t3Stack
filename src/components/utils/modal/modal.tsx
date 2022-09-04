//https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/large

import { Dispatch, SetStateAction } from 'react'

const SimpleModal = ({
  modalTitle,
  setShowModal,
  children,
}: {
  modalTitle?: string
  setShowModal: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-4 py-2">
              <h3 className="text-3xl font-semibold">{modalTitle}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative py-4 pr-8 pl-4 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
    </>
  )
}

export default SimpleModal

import { User, Rol } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

import { trpc } from '../../../utils/trpc'

import { useLoading } from '../../../zustand/loadingStore'
import { useRefetch } from '../../../zustand/refetchStore'

import { toast } from 'react-hot-toast'
import ErrorComponent from '../../utils/errors/errorComponent'

const UserForm = ({
  user,
  setShowModal,
}: {
  user: User & {
    rols: Rol[]
  }

  setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
  //zustand management of a blocking loading screen
  const setLoading = useLoading((state) => state.set_isLoading)

  //get the ability to refetch all the users from the zustand bucket
  const refetch = useRefetch((state) => state.getRefetch)

  //get the available rols
  const {
    isLoading,
    isError,
    error: fetchingRolError,
    data: rols,
  } = trpc.useQuery(['rol.all'])

  //form management
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.mail,
    rols: user.rols,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const id = Number(name)
    const checkedRols = [...form.rols]

    if (checked) {
      const rolToPush = rols?.find((it) => it.id === id)
      if (rolToPush) {
        checkedRols.push(rolToPush)

        setForm({ ...form, rols: checkedRols })
      }
    } else {
      const filteredRols = checkedRols.filter((it) => it.id !== id)
      setForm({ ...form, rols: filteredRols })
    }
  }

  //submit
  const { mutate, error: mutationError } = trpc.useMutation('user.edit', {
    onSettled: () => {
      if (refetch) {
        refetch()
      }
      setLoading(false)
    },
    onSuccess: () => {
      setShowModal(false)
      toast.success('User edited!')
    },
    onError: () => {
      toast.error('Something went wrong...')
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    //add fontend validation

    setLoading(true)

    mutate(form)
  }

  //render
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <ErrorComponent message={fetchingRolError.message} />
  }

  if (rols) {
    return (
      <div className="space-y-4">
        {mutationError && <ErrorComponent message={mutationError.message} />}
        <div className="flex justify-center">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                className="block w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                className="block w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="mail" className="mb-2 block text-sm font-medium">
                Mail
              </label>
              <input
                type="text"
                name="mail"
                placeholder="Mail"
                value={form.mail}
                className="block w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="rols" className="mb-2 block text-sm font-medium">
                Rols
              </label>
              <ul>
                {rols.map((it) => (
                  <li key={it.id}>
                    <label className=" flex flex-row space-x-2">
                      <div>
                        <input
                          type="checkbox"
                          name={it.id.toString()}
                          value={it.id.toString()}
                          checked={form.rols.some((rol) => rol.id === it.id)}
                          onChange={(e) => handleCheckboxChange(e)}
                        />
                      </div>
                      <div className="capitalize">{it.name}</div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <ErrorComponent message="Component didn't know what to render" />
}

export default UserForm

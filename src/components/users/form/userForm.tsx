import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from 'react-hook-form'
import { User, Rol } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

import { trpc } from '../../../utils/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserSchema, EditUserType } from '../../../schemas/user.schema'

import { useLoading } from '../../../zustand/loadingStore'
import { useRefetch } from '../../../zustand/refetchStore'

import { toast } from 'react-hot-toast'
import ErrorComponent from '../../utils/errors/errorComponent'
import SelectRols from './selectRols'

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

  //form management
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(EditUserSchema) })

  const { mutate, error } = trpc.useMutation('user.edit', {
    onSettled: () => {
      if (refetch) {
        refetch()
      }
      setLoading(false)
    },
    onSuccess: () => {
      toast.success('User edited!')
    },
    onError: () => {
      toast.error('Something went wrong...')
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //hide modal
    setShowModal(false)

    //display loading screen
    setLoading(true)

    //start mutating the data
    mutate(data as EditUserType)
  }

  return (
    <div className="space-y-4">
      {error && <ErrorComponent message={error.message} />}
      <div className="flex justify-center">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium"
            >
              First Name{' '}
              {errors.firstName?.message && (
                <span className="text-red-500">
                  {` -${errors.firstName.message}`}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="First name"
              defaultValue={user.firstName}
              className="block w-full rounded-lg border border-gray-300 p-2"
              {...register('firstName')}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium"
            >
              Last Name{' '}
              {errors.lastName?.message && (
                <span className="text-red-500">
                  {` -${errors.lastName.message}`}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Last name"
              defaultValue={user.lastName}
              className="block w-full rounded-lg border border-gray-300 p-2"
              {...register('lastName')}
            />
          </div>
          <div>
            <label htmlFor="mail" className="mb-2 block text-sm font-medium">
              Mail{' '}
              {errors.mail?.message && (
                <span className="text-red-500">
                  {` -${errors.mail.message}`}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Mail"
              defaultValue={user.mail}
              className="block w-full rounded-lg border border-gray-300 p-2"
              {...register('mail')}
            />
          </div>
          <div>
            <label htmlFor="rols" className="mb-2 block text-sm font-medium">
              Rols{' '}
              {errors.mail?.message && (
                <span className="text-red-500">
                  {` -${errors.mail.message}`}
                </span>
              )}
            </label>
            <Controller
              name="rols"
              control={control}
              render={({ field }) => <SelectRols field={field} />}
            />
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

export default UserForm

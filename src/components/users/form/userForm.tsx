import { User, Rol } from '@prisma/client'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { trpc } from '../../../utils/trpc'

import { useLoading } from '../../../zustand/loadingStore'
import { useRefetch } from '../../../zustand/refetchStore'

import { toast } from 'react-hot-toast'

import { EditUserSchema } from '../../../schemas/user.schema'
import { ZodError } from 'zod'

const UserForm = ({
  user,
  setShowModal,
}: {
  user: User & {
    rols: Rol[]
  }

  setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
  //* -------- Fetch the rols and render the checkboxes

  /**
   * get the available rols
   */
  const {
    isLoading,
    isError,
    error: fetchingRolError,
    data: rols,
  } = trpc.useQuery(['rol.findManyRol'])

  /**
   * render the rol checkboxes
   */
  const renderRols = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      throw new Error(fetchingRolError.message)
    }

    if (rols) {
      return (
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
      )
    }
  }

  //* -------- Handle form changes

  /**
   * form management
   */
  const [form, setForm] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.mail,
    rols: user.rols,
  })

  /**
   * handle form input (only textfields)
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  /**
   * handle form input (only checkboxes)
   */
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

  //* -------- Handle form validation

  /**
   * manage errors in form fields when submitting
   */
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    mail: '',
  })

  /**
   * callback used by the useEffect that setFormErrors. It detects errors in the form fields
   */
  const validateForm = useCallback(() => {
    try {
      EditUserSchema.parse(form)
      return true
    } catch (error) {
      const newErrors = { firstName: '', lastName: '', mail: '' }
      const zodError = error as ZodError
      for (const err of zodError.errors) {
        const key = err.path[0]
        if (
          key &&
          typeof key === 'string' &&
          (key === 'firstName' || key === 'lastName' || key === 'mail')
        ) {
          newErrors[key] = err.message
        }
      }
      setFormErrors(newErrors)
      return false
    }
  }, [form])

  /**
   * triggers the form validation on submit event
   */
  useEffect(() => {
    setFormErrors({
      firstName: '',
      lastName: '',
      mail: '',
    })
  }, [validateForm])

  //* -------- Const that are used when form submit

  /**
   * set blocking loading screen
   */
  const setLoading = useLoading((state) => state.set_isLoading)

  /**
   * when success, to see the reflected change / other changes that may had happen, we refetch all the users
   */
  const refetch = useRefetch((state) => state.getRefetch)

  //* -------- Handle form submit

  /**
   * submits the form to the backemd
   */
  const { mutate, error: mutationError } = trpc.useMutation(
    'user.updateOneUser',
    {
      onSettled: () => {
        setLoading(false)
      },
      onSuccess: () => {
        if (refetch) {
          refetch()
        }
        setShowModal(false)
        toast.success('User edited!')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    },
  )

  /**
   * handle submit event in form
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return
    }
    mutate(form)
  }

  /**
   * if mutationError, throw it
   */
  useEffect(() => {
    if (mutationError) {
      throw new Error(mutationError.message)
    }
  }, [mutationError])

  //* -------- Main render

  return (
    <div className="flex justify-center">
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name{' '}
            {formErrors.firstName && (
              <span className="text-red-500">~{formErrors.firstName}</span>
            )}
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
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name{' '}
            {formErrors.lastName && (
              <span className="text-red-500">~{formErrors.lastName}</span>
            )}
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
            Mail{' '}
            {formErrors.mail && (
              <span className="text-red-500">~{formErrors.mail}</span>
            )}
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
          {renderRols()}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default UserForm

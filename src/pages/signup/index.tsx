import Link from 'next/link'
import { useRouter } from 'next/router'

import { trpc } from '../../utils/trpc'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema, SignUpType } from '../../schemas/user.schema'

import { useLoading } from '../../zustand/loadingStore'

import ErrorComponent from '../../components/utils/errors/errorComponent'

const Signup = () => {
  //zustand management of a blocking loading screen
  const setLoading = useLoading((state) => state.set_isLoading)

  //router, used for redirecting to login page when success
  const router = useRouter()

  //form management
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignupSchema) })

  const { mutate, error } = trpc.useMutation('user.signup', {
    onSuccess: () => {
      router.push('/')
    },
  })

  const onSubmit: SubmitHandler<SignUpType> = (values) => {
    setLoading(true)
    mutate(values)
    setLoading(false)
  }

  return (
    <>
      {error && <ErrorComponent message={error.toString()} />}
      <div className="flex justify-center">
        <div className="rounded-lg border border-gray-300 p-4 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl">Sign up</h3>
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
                className="block w-full rounded-lg border border-gray-300 p-2"
                {...register('mail')}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password{' '}
                {errors.password?.message && (
                  <span className="text-red-500">
                    {` -${errors.password.message}`}
                  </span>
                )}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 p-2"
                {...register('password')}
              />
            </div>
            <div>
              <label
                htmlFor="repeatPassword"
                className="mb-2 block text-sm font-medium"
              >
                Repeat password{' '}
                {errors.repeatPassword?.message && (
                  <span className="text-red-500">
                    {` -${errors.repeatPassword.message}`}
                  </span>
                )}
              </label>
              <input
                type="password"
                id="repeatPassword"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 p-2"
                {...register('repeatPassword', {
                  required: 'required',
                })}
              />
            </div>
            <div className="text-sm font-medium">
              Already have an account?{' '}
              <Link href="/">
                <a className="text-blue-700 hover:underline dark:text-blue-500">
                  Go to login
                </a>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup

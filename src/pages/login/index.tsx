//https://tailwindcomponents.com/component/tailwind-css-login-card

//https://youtu.be/T6fRWZWrJzI
//https://youtu.be/DHZSYYTCTbA

import { useRouter } from 'next/router'
import Link from 'next/link'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'
import { useLoading } from '../../zustand/loadingStore'
import {
  LoginRequestSchema,
  LoginResponseType,
} from '../../schemas/auth.schema'
import { useSession } from '../../zustand/sessionStore'
import { useEffect } from 'react'

const Login = () => {
  //* ---- when landing here ----
  // router used to go to '/'
  const router = useRouter()

  // set loading screen while waiting to the fetch to finish
  const setLoading = useLoading((state) => state.set_isLoading)

  //checks that maybe I have a session and I shouldn't be here
  const getSession = useSession((state) => state.session)

  useEffect(() => {
    setLoading(true)
    if (getSession) {
      router.push('/')
    } else {
      toast('Please log in!')
    }
    setLoading(false)
  }, [getSession, router, setLoading])

  //* ---- Form management ----

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginRequestSchema) })

  //* ---- Handle submit ----

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      //put loading screen
      setLoading(true)

      //request login
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values),
      })

      const resjson = (await res.json()) as LoginResponseType

      //if login failed
      if (resjson.status !== 200) {
        if (resjson.status === 401) {
          toast.error('Invalid credentials, try again')
          return
        }
        throw new Error(resjson.message || 'Something went wrong...')
      }

      //we had success, let set the username in the front end

      toast.success('Welcome ' + resjson.data.firstName)

      //go to home page
      router.push('/')
    } catch (error) {
      toast.error('' + error)
    } finally {
      setLoading(false)
    }
  }

  //* ---- Main render ----

  return (
    <div className="flex justify-center">
      <div className="rounded-lg border border-gray-300 p-4 shadow-xl">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl">Login</h3>
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
              type="email"
              className="block w-full rounded-lg border border-gray-300 p-2"
              placeholder="Mail"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
          >
            Login
          </button>
          <div className="text-sm font-medium">
            Not registered?{' '}
            <Link href="/signup">
              <a className="text-blue-700 hover:underline dark:text-blue-500">
                Create account
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

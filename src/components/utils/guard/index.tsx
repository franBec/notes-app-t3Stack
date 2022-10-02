//https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetUserApiResponse } from '../../../schemas/auth.schema'
import { useSession } from '../../../zustand/sessionStore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RouteGuard({ children }: { children: any }) {
  //router to push oof to '/' if not auth
  const router = useRouter()

  //setter of zustand session, so the fronts knows there's no longer a session
  const setSession = useSession((state) => state.setSession)

  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const asyncFoo = async () => {
      // on initial load - run auth check
      await authCheck(router.asPath)

      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false)
      router.events.on('routeChangeStart', hideContent)

      // on route change complete - run auth check
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off('routeChangeStart', hideContent)
        router.events.off('routeChangeComplete', authCheck)
      }
    }
    asyncFoo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const restrictedPaths = ['/note', 'users', '/']
    const path = url.split('?')[0]

    //get user
    const res = await fetch('/api/auth/getUser')
    const json = (await res.json()) as GetUserApiResponse
    const session = json.data

    //If I do not have a session and I'm trying to go into somewhere not public, get pushed to '/'
    if (!session && path && restrictedPaths.includes(path)) {
      //deletes zustand session
      setSession(undefined)

      //push out!!!
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    } else {
      //ok so I do have a session, lets put it in the zustand session
      if (json.data) {
        setSession(json.data)
      }
      setAuthorized(true)
    }
  }

  return authorized && children
}

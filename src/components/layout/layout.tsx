import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './header'
import Footer from './footer'
import LoadingFullScreen from '../utils/loading/loadingFullScreen'

import { useLoading } from '../../zustand/loadingStore'

const Layout = ({ children }: { children: React.ReactNode }) => {
  //useState and useEffect that manage the blocking loading screen
  //everytime the clildren changes, this makes sure we dont land in a loading screen
  const get_isLoading = useLoading((state) => state.get_isLoading)
  const set_isLoading = useLoading((state) => state.set_isLoading)

  useEffect(() => {
    set_isLoading(false)
  }, [children])

  return (
    <>
      <div className="flex flex-col justify-between">
        <Header />

        {/* Toast notifications */}
        <Toaster position="top-center" reverseOrder={true} />

        {/* main content */}
        <main className="p-4 h-screen bg-slate-100">{children}</main>

        {/* footer */}
        <Footer />
      </div>
      {get_isLoading && <LoadingFullScreen />}
    </>
  )
}

export default Layout

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './header'
import Footer from './footer'
import LoadingFullScreen from '../utils/loading/loadingFullScreen'

import { useLoading } from '../../zustand/loadingStore'
import { usePaginationRequest } from '../../zustand/paginationStore'

const Layout = ({ children }: { children: React.ReactNode }) => {
  //* -------- Things to do when landing in a new page --------

  // 1- everytime the clildren changes, this makes sure we dont land in a loading screen
  const get_isLoading = useLoading((state) => state.get_isLoading)
  const set_isLoading = useLoading((state) => state.set_isLoading)

  // 2- resets pagination so next time we land in a component with a table, the table is in default order id desc
  const setPaginationResquest = usePaginationRequest(
    (state) => state.setPaginationRequest,
  )

  //do stuff!
  useEffect(() => {
    set_isLoading(false)
    setPaginationResquest(null)
  }, [children])

  //* -------- render! --------
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Header />

        {/* Toast notifications */}
        <Toaster position="top-center" reverseOrder={true} />

        {/* main content */}
        <main className="p-4 grow bg-slate-100">{children}</main>

        {/* footer */}
        <Footer />
      </div>
      {get_isLoading && <LoadingFullScreen />}
    </>
  )
}

export default Layout

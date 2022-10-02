import ErrorPage from '../components/utils/errors/errorPage'

const NotFound = () => {
  const error = new Error('Page not found')

  return <ErrorPage error={error} />
}

export default NotFound

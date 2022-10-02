import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import type { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'

import Layout from '../components/layout/layout'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from '../components/utils/errors/errorPage'
import RouteGuard from '../components/utils/guard'

//error boundary
function ErrorFallback({
  error,
}: {
  error: Error
  resetErrorBoundary: (...args: Array<unknown>) => void
}) {
  return <ErrorPage error={error} />
}

//main app
const MyApp: AppType = ({ Component, pageProps }) => {
  /*
  Why the double error boundary?
    Usually the error is caused by something that went wrong in the childen
    BUT there's the slight chance that the error may be caused by something in the layout
    So...

      The inner wrap is what you usually will encounter
      The outter wrap is a last resource, in case that the error is the layout fault
  */

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  )
}

//trpc
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)

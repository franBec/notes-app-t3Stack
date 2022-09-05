import type { NextApiResponse, NextPage } from 'next'
import { NextApiRequest } from 'next'

import Login from '../components/login/login'
import Home from '../components/home/home'

import { getPermissions } from '../server/services/auth/currentUser'

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  //this prevents an infinte loop of 'PLease log in'
  // const { query } = req
  // if (query) {
  //   return { props: {} }
  // }

  //get the current user permissions
  const { permissions, error } = await getPermissions(req)

  //if something went wrong, we set the error as query so someone can render a swal or toast or something
  if (error) {
    //  res.setHeader('location', `/?error=${error}`)
    //  res.statusCode = 302
    //  res.end()
    return { props: {} }
  }

  //good ending here
  return {
    props: {
      permissions: JSON.parse(JSON.stringify(permissions)),
    },
  }
}

interface Props {
  permissions: string[] | null
}

const Index: NextPage<Props> = ({ permissions }) => {
  return permissions ? <Home permissions={permissions} /> : <Login />
}

export default Index

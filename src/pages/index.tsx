import type { NextApiResponse, NextPage } from 'next'
import { NextApiRequest } from 'next'

import Login from '../components/login/login'
import Home from '../components/home/home'

import { getPermissions } from '../server/services/auth/currentUser'

export async function getServerSideProps({
  req,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  //get the current user permissions
  const permissions = await getPermissions(req)

  return {
    props: {
      permissions,
    },
  }
}

type IndexPropsType = {
  permissions: string[] | null
}

const Index: NextPage<IndexPropsType> = ({ permissions }) => {
  return permissions ? <Home permissions={permissions} /> : <Login />
}

export default Index

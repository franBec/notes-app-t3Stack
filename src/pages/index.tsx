import type { NextApiResponse, NextPage } from 'next'
import { NextApiRequest } from 'next'

import Login from '../components/login/login'
import Home from '../components/home/home'

import { getPermissions } from '../server/services/auth/currentUser'
import { GetPermissionsType } from '../schemas/currentUser.schema'

export async function getServerSideProps({
  req,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  //get the current user permissions
  const props = await getPermissions(req)

  return {
    props,
  }
}

const Index: NextPage<GetPermissionsType> = ({ permissions }) => {
  return permissions ? <Home permissions={permissions} /> : <Login />
}

export default Index

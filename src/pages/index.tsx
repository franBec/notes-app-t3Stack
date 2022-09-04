/*
import type { NextPage } from 'next'
import { NextApiRequest } from 'next'

*/
import Login from '../components/login/login'
//import Home from '../components/home/home'

/*
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  
  const cookieName = process.env.COOKIENAME;
  const { permissions } = await getCurrentUser_permissions(
    req.cookies[cookieName]
  );

  const permissions: string[] | null = null
  return {
    props: { permissions },
  }
}

interface Props {
  permissions: string[] | null
}

const Index: NextPage<Props> = ({ permissions }) => {
  //return permissions ? <Home permissions={permissions} /> : <Login />
  return true ? <Home permissions={['USERS_SEE']} /> : <Login />
}
*/

const Index = () => {
  return <Login />
}
export default Index

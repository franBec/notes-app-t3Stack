import { useRouter } from 'next/router'
import { DefaultQueryCell } from '../../utils/DefaultQueryCell'
import { trpc } from '../../utils/trpc'

export default function NotePage() {
  const id = Number(useRouter().query.id)
  const noteQuery = trpc.useQuery(['note.byId', { id }])

  return (
    <DefaultQueryCell
      query={noteQuery}
      success={({ data }) => (
        <>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
          <em>Created {data.created.toLocaleDateString()}</em>
        </>
      )}
    />
  )
}

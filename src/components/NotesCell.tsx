import Link from "next/link"
import { DefaultQueryCell } from "../utils/DefaultQueryCell"
import { trpc } from "../utils/trpc"

type NoteProps = {
    id: string
    title: string
  }

export default function NotesCell() {
  const noteQuery = trpc.useQuery(["note.all"])

  return (
    <>

      {noteQuery.status === 'loading'}

      <DefaultQueryCell
        query={noteQuery}
        success={({ data }: any) => (
          data.map(({id, title}: NoteProps) => (
            <Link key={id} href={`/note/${id}`}>
              <p>
                {title}
              </p>
            </Link>
          ))
        )}
        empty={() => <p>WE NEED NOTES!!!</p>}
        
      />
    </>
  )
}
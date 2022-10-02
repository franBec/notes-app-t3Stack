import z from 'zod'
import { MainSchema } from './main.schema'
import { UserSchema } from './user.schema'

export const NoteSchema = MainSchema.extend({
  title: z.string().max(100, { message: 'At most 100 characters' }),
  content: z
    .string()
    .max(1000, { message: 'At most 1000 characters' })
    .nullish(),
  archived: z.boolean().default(true),

  //belongs to...
  user: UserSchema,
})

export type NoteType = z.infer<typeof NoteSchema>

import z from 'zod'

export const MainSchema = z.object({
  id: z.number().int().positive(),
  created: z.date().default(new Date()),
  modified: z.date().nullish(),
})

export type MainType = z.infer<typeof MainSchema>

/**
 * This file contains all usefull schemas and enums
 * that are generic to pagination use cases
 */
import z from 'zod'

//SORT ENUM used by zod and prisma to ensure Enumerable<SchemaOrderByWithRelationInput>
export enum SortEnum {
  'asc' = 'asc',
  'desc' = 'desc',
}

//INPUT REQUEST usually send when asking for data
export const RequestSchema = z
  .object({
    page: z.number().nullish(),
    order: z.string().nullish(),
    sort: z.nativeEnum(SortEnum).nullish(),
  })
  .nullish()

export type RequestType = z.infer<typeof RequestSchema>

//METADATA returned after fetching data
export const MetadataSchema = z.object({
  totalRows: z.number(),
  rowsByPage: z.number(),
  currentPage: z.number(),
})

export type MetadataType = z.infer<typeof MetadataSchema>

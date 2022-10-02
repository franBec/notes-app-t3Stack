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

//INPUT REQUEST usually sent by client when asking for data
export const PaginationRequestSchema = z
  .object({
    page: z.number().nullish(),
    order: z.string().nullish(),
    sort: z.nativeEnum(SortEnum).nullish(),
    limit: z.boolean().default(true).nullish(),
  })
  .nullish()

export type PaginationRequestType = z.infer<typeof PaginationRequestSchema>

//METADATA returned to the client after fetching data
export const PaginationResponseSchema = z.object({
  totalRows: z.number(),
  rowsByPage: z.number(),
  currentPage: z.number(),
})

export type PaginationResponseType = z.infer<typeof PaginationResponseSchema>

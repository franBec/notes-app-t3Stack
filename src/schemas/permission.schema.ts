import z from 'zod'
import { MainSchema } from './main.schema'

export const PermissionSchema = MainSchema.extend({
  name: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  description: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(255, { message: 'At most 255 characters' }),
})

export type PermissionType = z.infer<typeof PermissionSchema>

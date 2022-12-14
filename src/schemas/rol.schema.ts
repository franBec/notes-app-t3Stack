import z from 'zod'
import { MainSchema } from './main.schema'
import { PermissionSchema } from './permission.schema'

export const RolSchema = MainSchema.extend({
  name: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(50, { message: 'At most 50 characters' }),
  description: z
    .string()
    .min(3, { message: 'At least 3 characters' })
    .max(255, { message: 'At most 255 characters' }),

  //has many...
  permissions: PermissionSchema.array(),
})

export type RolType = z.infer<typeof RolSchema>

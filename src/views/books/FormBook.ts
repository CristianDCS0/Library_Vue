import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const formSchema = toTypedSchema(z.object({
  title: z.string().min(2).max(50),
  author: z.string().min(2).max(50),
  editorial: z.string().min(3).max(50),
  genre: z.string().min(2).max(30),
  description: z.string().min(10).max(255),
  img_book: z.custom((value) => {
    return value instanceof File || value === null;
  }, 'img_book must be a file'),
  date_published: z.string().min(4).max(10)
}));

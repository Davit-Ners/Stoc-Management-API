import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string()
            .min(2)
            .max(50),
    reference: z.string()
                .min(1)
                .max(255),
    description: z.string()
                  .min(10)
                  .max(1000)
                  .optional(),
    price: z.number()
            .nonnegative(),
    category: z.string(50)
}).required();
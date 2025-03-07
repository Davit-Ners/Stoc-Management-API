import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string()
            .min(2)
            .max(50),
    email: z.string()
            .min(1)
            .max(255)
            .email(),
    role: z.enum(['ADMIN', 'EMPLOYE', 'MANAGER']),
    firstname: z.string()
                .min(2)
                .max(50)
                .optional(),
    lastname: z.string(50)
                .min(2)
                .max(50)
                .optional()
}).required();
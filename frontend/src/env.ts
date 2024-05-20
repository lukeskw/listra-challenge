import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_API_PROTOCOL: z.string().min(4),
  NEXT_PUBLIC_API_URI: z.string(),
  NEXT_PUBLIC_API_PORT: z.coerce.number().default(8085),
  NEXT_PUBLIC_API_PATH: z.string().default('api'),
})

console.log(process.env.NEXT_PUBLIC_API_PROTOCOL)
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data

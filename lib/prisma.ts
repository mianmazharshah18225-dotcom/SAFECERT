import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
  pool: Pool
}

// Create connection pool (reuse across requests)
const getPool = () => {
  if (globalForPrisma.pool) return globalForPrisma.pool

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Maximum number of clients in the pool
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.pool = pool
  }

  return pool
}

const getPrismaClient = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const pool = getPool()
  const adapter = new PrismaPg(pool)

  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }

  return client
}

export const prisma = getPrismaClient()

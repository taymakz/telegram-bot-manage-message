export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { databaseUrl, query, demoMode = false } = body

  if (!databaseUrl || !query) {
    throw createError({
      statusCode: 400,
      message: 'databaseUrl and query are required',
    })
  }

  try {
    // Parse database URL to determine type
    const dbType = getDatabaseType(databaseUrl)

    let results: any[] = []

    // Demo mode - return mock data
    if (demoMode) {
      results = getMockData(dbType)
      return {
        success: true,
        data: results,
        count: results.length,
        demoMode: true,
        message: 'Demo mode: Returning sample data. Install database drivers for real queries.',
      }
    }

    // Real database queries
    switch (dbType) {
      case 'postgresql':
        results = await queryPostgreSQL(databaseUrl, query)
        break
      case 'mysql':
        results = await queryMySQL(databaseUrl, query)
        break
      case 'mongodb':
        results = await queryMongoDB(databaseUrl, query)
        break
      default:
        throw new Error('Unsupported database type')
    }

    return {
      success: true,
      data: results,
      count: results.length,
      demoMode: false,
    }
  }
  catch (error: any) {
    console.error('Database query error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to execute query',
    })
  }
})

function getDatabaseType(url: string): string {
  if (url.startsWith('postgres://') || url.startsWith('postgresql://')) {
    return 'postgresql'
  }
  if (url.startsWith('mysql://')) {
    return 'mysql'
  }
  if (url.startsWith('mongodb://') || url.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }
  return 'unknown'
}

// Generate mock data for demo mode
function getMockData(_dbType: string): any[] {
  // Return sample data with various ID formats
  return [
    { id: 123456789, name: 'User 1', active: true, created_at: '2025-01-01' },
    { id: 987654321, name: 'User 2', active: true, created_at: '2025-01-02' },
    { message_id: 555666777, chat_id: 111222333, text: 'Sample message' },
    { user_id: 444555666, email: 'user@example.com', status: 'active' },
    { id: 777888999, chat_id: 222333444, type: 'group' },
    { id: 100200300, name: 'Channel 1', subscriber_count: 1500 },
    { message_id: 999888777, from_id: 666555444, date: '2025-11-07' },
    { id: 333222111, username: 'testuser', verified: true },
  ]
}

// PostgreSQL query handler
async function queryPostgreSQL(connectionString: string, query: string): Promise<any[]> {
  try {
    // Dynamic import to avoid errors if package not installed
    const { Pool } = await import('pg')

    const pool = new Pool({
      connectionString,
      ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 5000,
    })

    try {
      const result = await pool.query(query)
      return result.rows
    }
    finally {
      await pool.end()
    }
  }
  catch (error: any) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Cannot find module')) {
      throw new Error('PostgreSQL support requires pg library. Install with: pnpm add pg')
    }
    throw error
  }
}

// MySQL query handler
async function queryMySQL(connectionString: string, query: string): Promise<any[]> {
  try {
    // Dynamic import to avoid errors if package not installed
    const mysql = await import('mysql2/promise')

    const connection = await mysql.createConnection({
      uri: connectionString,
      connectTimeout: 5000,
    })

    try {
      const [rows] = await connection.execute(query)
      return rows as any[]
    }
    finally {
      await connection.end()
    }
  }
  catch (error: any) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Cannot find module')) {
      throw new Error('MySQL support requires mysql2 library. Install with: pnpm add mysql2')
    }
    throw error
  }
}

// MongoDB query handler
async function queryMongoDB(connectionString: string, queryString: string): Promise<any[]> {
  try {
    // Dynamic import to avoid errors if package not installed
    const { MongoClient } = await import('mongodb')

    const client = new MongoClient(connectionString, {
      serverSelectionTimeoutMS: 5000,
    })

    try {
      await client.connect()

      // Parse query string as JSON for MongoDB filter
      let filter = {}
      try {
        filter = JSON.parse(queryString)
      }
      catch {
        throw new Error('MongoDB query must be valid JSON format, e.g., {"status": "active"}')
      }

      // Get database name from connection string or use default
      const db = client.db()

      // You may need to specify collection name - for now use first collection
      const collections = await db.listCollections().toArray()
      if (collections.length === 0) {
        throw new Error('No collections found in database')
      }

      const collection = db.collection(collections[0].name)
      const results = await collection.find(filter).limit(1000).toArray()

      return results
    }
    finally {
      await client.close()
    }
  }
  catch (error: any) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Cannot find module')) {
      throw new Error('MongoDB support requires mongodb library. Install with: pnpm add mongodb')
    }
    throw error
  }
}

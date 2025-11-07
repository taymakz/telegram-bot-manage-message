/**
 * Parse and extract IDs from various response formats
 * Handles: id, message_id, user_id, chat_id, etc.
 */
export function parseIds(data: any): number[] {
  const ids = new Set<number>()

  function extractId(obj: any) {
    if (!obj || typeof obj !== 'object')
      return

    // Check for various ID fields
    const idFields = ['id', 'message_id', 'user_id', 'chat_id', 'from_id', 'sender_id']

    for (const field of idFields) {
      if (obj[field] !== undefined) {
        const value = obj[field]
        if (typeof value === 'number') {
          ids.add(value)
        }
        else if (typeof value === 'string') {
          const num = Number(value)
          if (!Number.isNaN(num)) {
            ids.add(num)
          }
        }
      }
    }

    // Recursively check nested objects and arrays
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach(extractId)
      }
      else if (typeof obj[key] === 'object') {
        extractId(obj[key])
      }
    }
  }

  // Handle different input types
  if (Array.isArray(data)) {
    data.forEach(extractId)
  }
  else {
    extractId(data)
  }

  return Array.from(ids)
}

/**
 * Format IDs as comma-separated string
 */
export function formatIdsForInput(ids: number[]): string {
  return ids.join(',')
}

/**
 * Validate and normalize chat IDs
 */
export function normalizeIds(ids: (string | number)[]): number[] {
  return ids
    .map((id) => {
      if (typeof id === 'number')
        return id
      const num = Number(id)
      return Number.isNaN(num) ? null : num
    })
    .filter((id): id is number => id !== null)
}

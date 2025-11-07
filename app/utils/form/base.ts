import * as z from 'zod'

// Zod Configuration for Persian error messages
z.setErrorMap((issue, _ctx) => {
  switch (issue.code) {
    case 'invalid_type':
      if (issue.expected === 'string') {
        return { message: 'ورودی نامعتبر است' }
      }
      return { message: 'ورودی نامعتبر است' }
    case 'too_small':
      if (issue.type === 'string') {
        return { message: `حداقل مقدار ${issue.minimum} است` }
      }
      if (issue.type === 'number') {
        return { message: `حداقل مقدار ${issue.minimum} است` }
      }
      return { message: 'ورودی خیلی کوچک است' }
    case 'too_big':
      if (issue.type === 'string') {
        return { message: `حداکثر مقدار ${issue.maximum} است` }
      }
      if (issue.type === 'number') {
        return { message: `حداکثر مقدار ${issue.maximum} است` }
      }
      return { message: 'ورودی خیلی بزرگ است' }
    case 'invalid_string':
      if (issue.validation === 'email') {
        return { message: 'ایمیل وارد شده نامعتبر است' }
      }
      if (issue.validation === 'url') {
        return { message: 'لینک وارد شده نامعتبر است' }
      }
      return { message: 'رشته نامعتبر است' }
    default:
      return { message: 'ورودی نامعتبر است' }
  }
})

export { z as Zod }

// Trim whitespace transformer equivalent
export const trimWhitespaceTransformer = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val.trim()
  }
  return val
}, z.any())

/**
 * Creates a nullable number field that allows null (unlimited) but validates minimum when value is provided
 * @param minValue - Minimum value when not null (default: 1)
 * @param errorMessage - Error message for minimum validation
 * @returns Zod schema for nullable number with minimum validation
 */
export function createNullableMinNumber(
  minValue: number = 1,
  errorMessage: string = `حداقل مقدار ${minValue} است`,
) {
  return z
    .preprocess((value) => {
      // Handle null, undefined, empty string, and NaN cases
      if (
        value === null
        || value === undefined
        || value === ''
        || Number.isNaN(value)
      ) {
        return null
      }
      return Number(value)
    }, z.number().nullable())
    .refine((value) => {
      // Only validate when value is actually a number
      if (value === null || value === undefined) {
        return true // null/undefined values are valid (unlimited)
      }
      return value >= minValue
    }, errorMessage)
}

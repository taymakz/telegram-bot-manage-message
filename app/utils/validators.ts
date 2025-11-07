/**
 * Regular expression for validating email addresses.
 * Ensures that the email contains at least one character before and after the "@" symbol,
 * followed by a valid domain name with at least one dot.
 */
export const emailRegex = /^\S[^\s@]*@\S[^\s.]*\.\S+$/

/**
 * Regular expression for validating Iranian phone numbers.
 * Accepts numbers starting with "+98", "0", or no prefix, followed by a 9-digit number.
 */
export const phoneRegex = /^(\+98|0)?9\d{9}$/

/**
 * Regular expression for validating Iranian postal codes.
 * Ensures the postal code consists of exactly 10 digits.
 */
export const postalCodeRegex = /^\d{10}$/

/**
 * Regular expression for validating Iranian national codes.
 * Ensures the national code consists of exactly 10 digits.
 */
export const nationalCodeRegex = /^\d{10}$/

/**
 * Regular expression for validating passwords.
 * Requires at least one uppercase letter, one lowercase letter, and a length between 6 and 18 characters.
 */
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,18}$/

/**
 * Regular expression to check if a password contains at least one lowercase letter.
 */
export const passwordLowercaseRegex = /[a-z]/

/**
 * Regular expression to check if a password contains at least one uppercase letter.
 */
export const passwordUppercaseRegex = /[A-Z]/

/**
 * Regular expression to check if a password contains at least one numeric digit.
 */
export const passwordNumberRegex = /\d/

/**
 * Regular expression to check if a password length is between 8 and 32 characters.
 */
export const passwordLengthRegex = /^.{8,32}$/

/**
 * Checks if a password contains at least one lowercase letter.
 *
 * @param password - The password to validate.
 * @returns True if the password contains a lowercase letter, otherwise false.
 */
export function passwordHasLowercase(password: string): boolean {
  return passwordLowercaseRegex.test(password)
}

/**
 * Checks if a password contains at least one uppercase letter.
 *
 * @param password - The password to validate.
 * @returns True if the password contains an uppercase letter, otherwise false.
 */
export function passwordHasUppercase(password: string): boolean {
  return passwordUppercaseRegex.test(password)
}

/**
 * Checks if a password contains at least one numeric digit.
 *
 * @param password - The password to validate.
 * @returns True if the password contains a number, otherwise false.
 */
export function passwordHasNumber(password: string): boolean {
  return passwordNumberRegex.test(password)
}

/**
 * Checks if a password length is between 6 and 18 characters.
 *
 * @param password - The password to validate.
 * @returns True if the password length is valid, otherwise false.
 */
export function passwordIsValidPasswordLength(password: string): boolean {
  return passwordLengthRegex.test(password)
}

/**
 * Validates a password based on predefined criteria.
 * Requires at least one uppercase letter, one lowercase letter, and a valid length.
 *
 * @param password - The password to validate.
 * @returns True if the password meets the requirements, otherwise false.
 */
export function validatePassword(password: string): boolean {
  return passwordRegex.test(password)
}
/**
 * Validates a password against all rules at once:
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one numeric digit
 * - Length between 6 and 18 characters
 *
 * @param password - The password to validate.
 * @returns True if the password meets all requirements, otherwise false.
 */
export function fullPasswordValidator(password: string): boolean {
  return (
    passwordLowercaseRegex.test(password)
    && passwordUppercaseRegex.test(password)
    && passwordNumberRegex.test(password)
    && passwordLengthRegex.test(password)
  )
}
/**
 * Validates an Iranian phone number.
 *
 * @param phoneNumber - The phone number to validate.
 * @returns True if the phone number is valid, otherwise false.
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  return phoneRegex.test(phoneNumber)
}

/**
 * Validates an email address.
 *
 * @param email - The email to validate.
 * @returns True if the email is valid, otherwise false.
 */
export function validateEmail(email: string): boolean {
  return emailRegex.test(email)
}

/**
 * Validates a username as either a phone number or an email address.
 *
 * @param username - The username to validate.
 * @returns True if the username is a valid phone number or email, otherwise false.
 */
export function validateUsername(username: string): boolean {
  return phoneRegex.test(username) || emailRegex.test(username)
}

/**
 * Alias kept for naming consistency when the variable is called `phone`.
 * Validates whether the input is a phone number or an email address.
 */
export function validatePhone(value: string): boolean {
  return validateUsername(value)
}

/**
 * Validates an Iranian postal code.
 *
 * @param postalCode - The postal code to validate.
 * @returns True if the postal code is valid, otherwise false.
 */
export function validatePostalCode(postalCode: string): boolean {
  return postalCodeRegex.test(postalCode)
}

/**
 * Validates an Iranian national code.
 *
 * The validation includes:
 * - Ensuring the input is exactly 10 digits.
 * - Performing a checksum calculation to verify its authenticity.
 *
 * @param nationalCode - The national code to validate.
 * @returns True if the national code is valid, otherwise false.
 */
export function validateNationalCode(nationalCode?: string): boolean {
  if (
    !nationalCode
    || nationalCode.length !== 10
    || !nationalCodeRegex.test(nationalCode)
  ) {
    return false
  }

  const check = Number.parseInt(nationalCode[9]!)
  let sum = 0

  for (let i = 0; i < 9; i++)
    sum += Number.parseInt(nationalCode[i]!) * (10 - i)

  const remainder = sum % 11

  return (
    (remainder < 2 && check === remainder)
    || (remainder >= 2 && check + remainder === 11)
  )
}

/**
 * Validates a Google Maps URL.
 *
 * @param value - The URL to validate.
 * @returns True if the URL is a valid Google Maps URL, otherwise false.
 */
export function validateGoogleMapsUrl(value: string): boolean {
  if (!value)
    return false
  // Google Maps URL format: any google.com/maps URL
  const googleRegex = /^https:\/\/(?:www\.)?google\.com\/maps\/.*$/
  return googleRegex.test(value)
}

/**
 * Validates a Balad URL.
 *
 * @param value - The URL to validate.
 * @returns True if the URL is a valid Balad URL, otherwise false.
 */
export function validateBaladUrl(value: string): boolean {
  if (!value)
    return false
  // Balad URL format: any balad.ir URL
  const baladRegex = /^https:\/\/balad\.ir\/.*$/
  return baladRegex.test(value)
}

/**
 * Validates a Neshan URL.
 *
 * @param value - The URL to validate.
 * @returns True if the URL is a valid Neshan URL, otherwise false.
 */
export function validateNeshanUrl(value: string): boolean {
  if (!value)
    return false
  // Neshan URL formats: any neshan.org or nshn.ir URL
  const neshanRegex = /^https:\/\/(?:maps\.neshan\.org|nshn\.ir)\/.*$/
  return neshanRegex.test(value)
}

/**
 * Validates a Waze URL.
 *
 * @param value - The URL to validate.
 * @returns True if the URL is a valid Waze URL, otherwise false.
 */
export function validateWazeUrl(value: string): boolean {
  if (!value)
    return false
  // Waze URL format: any waze.com URL including subdomains
  const wazeRegex = /^https:\/\/(?:.*\.)?waze\.com\/.*$/
  return wazeRegex.test(value)
}

/**
 * Validates an iframe URL or iframe tag.
 *
 * @param value - The URL or iframe tag to validate.
 * @returns True if the value is a valid URL or contains a valid iframe src, otherwise false.
 */
export function validateIframeUrl(value: string): boolean {
  if (!value)
    return false

  // Check if it's a valid URL (http or https)
  const urlRegex = /^https?:\/\/.+$/
  if (urlRegex.test(value)) {
    return true
  }

  // Check if it's an iframe tag and extract src
  const iframeRegex = /<iframe[^>]+src=["']([^"']+)["'][^>]*>/
  const match = value.match(iframeRegex)
  if (match && match[1]) {
    const src = match[1]
    return urlRegex.test(src)
  }

  return false
}

/**
 * Extracts the src URL from an iframe tag or returns the value if it's already a URL.
 *
 * @param value - The iframe tag or URL to process.
 * @returns The extracted src URL or the original value if it's already a URL.
 */
export function extractIframeSrc(value: string): string {
  if (!value)
    return value

  // Check if it's an iframe tag and extract src
  const iframeRegex = /<iframe[^>]+src=["']([^"']+)["'][^>]*>/
  const match = value.match(iframeRegex)
  if (match && match[1]) {
    return match[1]
  }

  // If it's already a direct URL, return as is
  return value
}

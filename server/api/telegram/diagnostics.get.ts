export default defineEventHandler(async () => {
  const results = {
    timestamp: new Date().toISOString(),
    checks: {} as Record<string, any>,
  }

  // Check DNS resolution
  try {
    const dns = await import('node:dns/promises')
    const addresses = await dns.resolve4('api.telegram.org')
    results.checks.dns = {
      status: 'success',
      addresses,
    }
  }
  catch (error: any) {
    results.checks.dns = {
      status: 'failed',
      error: error.message,
      code: error.code,
    }
  }

  // Check HTTP connectivity
  try {
    await $fetch('https://api.telegram.org/bot123:test/getMe', {
      timeout: 5000,
      ignoreResponseError: true,
    })
    results.checks.http = {
      status: 'success',
      note: 'Telegram API is reachable',
    }
  }
  catch (error: any) {
    results.checks.http = {
      status: 'failed',
      error: error.message,
      code: error.cause?.code,
    }
  }

  return results
})

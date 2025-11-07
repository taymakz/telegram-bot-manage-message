export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { botToken, chatId, text, parseMode, photo } = body

  if (!botToken || !chatId) {
    throw createError({
      statusCode: 400,
      message: 'botToken and chatId are required',
    })
  }

  if (!text && !photo) {
    throw createError({
      statusCode: 400,
      message: 'Either text or photo is required',
    })
  }

  try {
    const baseUrl = `https://api.telegram.org/bot${botToken}`

    // If there's a photo, send as photo with caption
    if (photo) {
      const response = await $fetch(`${baseUrl}/sendPhoto`, {
        method: 'POST',
        body: {
          chat_id: chatId,
          photo,
          caption: text || undefined,
          parse_mode: parseMode || undefined,
        },
        timeout: 30000, // 30 second timeout
      })

      return {
        success: true,
        data: response,
      }
    }

    // Otherwise send as text message
    const response = await $fetch(`${baseUrl}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text,
        parse_mode: parseMode || undefined,
      },
      timeout: 30000, // 30 second timeout
    })

    return {
      success: true,
      data: response,
    }
  }
  catch (error: any) {
    console.error('Telegram API Error:', error)

    // Better error messages for common issues
    let errorMessage = 'Failed to send message'

    if (error.cause?.code === 'ENOENT' || error.cause?.code === 'ENOTFOUND') {
      errorMessage = 'Cannot reach Telegram API. Please check your internet connection or if Telegram is accessible in your region. You may need to use a VPN.'
    }
    else if (error.cause?.code === 'ETIMEDOUT' || error.cause?.code === 'ECONNREFUSED') {
      errorMessage = 'Connection to Telegram API timed out. Please check your network connection.'
    }
    else if (error.data?.description) {
      errorMessage = error.data.description
    }
    else if (error.message) {
      errorMessage = error.message
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: errorMessage,
    })
  }
})

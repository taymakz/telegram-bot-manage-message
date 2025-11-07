export interface TelegramMessage {
  text: string
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML' | null
  photo?: string
}

export interface SendMessageResult {
  success: boolean
  chat_id: string | number
  message_id?: number
  error?: string
}

export function useTelegram() {
  /**
   * Parse chat IDs from various formats:
   * - "123,456"
   * - "[123,456]"
   * - "[{id:123}, {id:456}]"
   */
  function parseChatIds(input: string): (string | number)[] {
    try {
      // Remove whitespace
      const cleaned = input.trim()

      // Try to parse as JSON first
      try {
        const parsed = JSON.parse(cleaned)
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            if (typeof item === 'object' && item.id !== undefined) {
              return item.id
            }
            return item
          })
        }
      }
      catch {
        // Not valid JSON, continue with other parsing methods
      }

      // Remove brackets if present
      const withoutBrackets = cleaned.replace(/^\[|\]$/g, '')

      // Split by comma and clean up
      return withoutBrackets
        .split(',')
        .map(id => id.trim())
        .filter(id => id.length > 0)
        .map((id) => {
          // Try to convert to number if possible
          const num = Number(id)
          return Number.isNaN(num) ? id : num
        })
    }
    catch (error) {
      console.error('Error parsing chat IDs:', error)
      return []
    }
  }

  /**
   * Send message to a single chat via our server API
   */
  async function sendMessage(
    botToken: string,
    chatId: string | number,
    message: TelegramMessage,
  ): Promise<SendMessageResult> {
    try {
      // Use our server API endpoint to avoid CORS issues
      const response = await $fetch<any>('/api/telegram/sendMessage', {
        method: 'POST',
        body: {
          botToken,
          chatId,
          text: message.text,
          parseMode: message.parse_mode,
          photo: message.photo,
        },
      })

      return {
        success: true,
        chat_id: chatId,
        message_id: response.data?.result?.message_id,
      }
    }
    catch (error: any) {
      console.error('Send message error:', error)
      return {
        success: false,
        chat_id: chatId,
        error: error.data?.message || error.message || 'Failed to send message',
      }
    }
  }

  /**
   * Send message to multiple chats
   */
  async function sendMessageToMultipleChats(
    botToken: string,
    chatIds: (string | number)[],
    message: TelegramMessage,
  ): Promise<SendMessageResult[]> {
    const results = await Promise.all(
      chatIds.map(chatId => sendMessage(botToken, chatId, message)),
    )
    return results
  }

  /**
   * Upload image to a temporary hosting service and get URL
   * Using imgbb as an example (you can replace with your preferred service)
   */
  async function uploadImage(file: File): Promise<string> {
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          // Remove data:image/...;base64, prefix
          const base64Data = result.split(',')[1]
          if (!base64Data) {
            reject(new Error('Failed to convert image to base64'))
            return
          }
          resolve(base64Data)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Using imgbb API (free tier: 32 MB limit)
      const apiKey = 'd51fd5e5e179dcfb85f6bc1546803c6f'

      const formData = new FormData()
      formData.append('image', base64)

      const response = await $fetch<any>(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.data?.url) {
        throw new Error('Failed to get image URL from upload service')
      }

      return response.data.url
    }
    catch (error: any) {
      console.error('Error uploading image:', error)
      throw new Error(error.message || 'Failed to upload image. Please try again.')
    }
  }

  /**
   * Format text according to Telegram parse modes
   */
  function formatPreviewText(text: string, parseMode: string | null): string {
    if (!parseMode || parseMode === 'None') {
      return text
    }

    // For preview purposes, we'll do basic HTML rendering
    // In a real implementation, you might want to use a proper markdown/HTML parser
    let formatted = text

    if (parseMode === 'Markdown' || parseMode === 'MarkdownV2') {
      // Convert markdown bold
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      formatted = formatted.replace(/\*(.+?)\*/g, '<strong>$1</strong>')

      // Convert markdown italic
      formatted = formatted.replace(/__(.+?)__/g, '<em>$1</em>')
      formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>')

      // Convert markdown code
      formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>')

      // Convert links
      formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    }

    // HTML mode - text is already in HTML format

    return formatted
  }

  return {
    parseChatIds,
    sendMessage,
    sendMessageToMultipleChats,
    uploadImage,
    formatPreviewText,
  }
}

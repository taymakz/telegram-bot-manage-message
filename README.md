# Telegram Message Manager

A modern web application for managing Telegram bot profiles and sending messages to multiple chats. Built with Nuxt 3, Pinia, and Shadcn-Vue UI components.

## 🌐 Demo

Try it live: **[https://telegram-bot-manage-message.vercel.app](https://telegram-bot-manage-message.vercel.app/)**

## ✨ Features

- 🤖 **Bot Profile Management** - Create and manage multiple Telegram bot profiles
- 📝 **Message Composer** - Rich text input with Markdown/HTML support
- 👁️ **Live Preview** - Real-time Telegram-style message preview
- 🚀 **Multi-chat Sending** - Send to multiple chats simultaneously
- 🖼️ **Image Upload** - Upload and host images with messages
- 🔘 **Inline Buttons** - Add clickable buttons with custom URLs
- 🗄️ **Database Integration** - Import chat IDs from PostgreSQL, MySQL, or MongoDB
- 🔧 **Network Diagnostics** - Built-in connectivity testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn
- Telegram Bot Token from [@BotFather](https://t.me/BotFather)

### Installation
```bash
git clone <your-repo-url>
cd telegram-bot-manage-message
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## 📖 Usage

1. Create a bot profile with your Telegram Bot Token
2. Select the active bot profile
3. Compose your message with optional image and buttons
4. Enter chat IDs or import from database
5. Send to multiple chats at once

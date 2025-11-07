# Telegram Message Manager

A modern, user-friendly web application for managing Telegram bot profiles and sending messages to multiple chats. Built with Nuxt 3, Pinia, and Shadcn-Vue UI components.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3.0-00DC82?style=flat&logo=nuxt.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Pinia](https://img.shields.io/badge/Pinia-3.0-F7C92A?style=flat&logo=pinia)
![Vue](https://img.shields.io/badge/Vue-3.0-4FC08D?style=flat&logo=vue.js)

## ✨ Features

### 🤖 Bot Profile Management
- **Create & Manage** multiple Telegram bot profiles
- **Persistent Storage** using browser cookies (1 year expiry)
- **Profile Selection** with dropdown interface
- **CRUD Operations** - Add, edit, delete profiles
- **Secure Token Storage** (client-side only)

### 📝 Message Composer
- **Rich Text Input** with textarea
- **Format Support** - Markdown, MarkdownV2, HTML, Plain Text
- **Flexible Chat IDs** - Multiple input formats supported:
  - `123,456` (comma-separated)
  - `[123,456]` (array format)
  - `[{id:123}, {id:456}]` (object array)
- **Image Upload** with preview and hosting
- **Real-time Preview** of formatted messages

### 👁️ Live Preview
- **Telegram-style** message bubble display
- **Format Rendering** - Shows how messages will appear
- **Image Preview** - Displays uploaded images
- **Responsive Design** - Works on all screen sizes

### 🚀 Message Sending
- **Multi-chat Support** - Send to multiple chats simultaneously
- **Success/Error Notifications** with detailed feedback
- **Progress Indicators** during sending
- **Server-side API** - CORS-free Telegram integration

### 🔧 Technical Features
- **Server-side API Proxy** - Avoids CORS issues
- **Network Diagnostics** - Built-in connectivity testing
- **Error Handling** - Comprehensive error messages
- **Responsive UI** - Mobile-friendly design
- **TypeScript** - Full type safety

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** (recommended) or npm/yarn
- **Telegram Bot Token** from [@BotFather](https://t.me/BotFather)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd telegram-bot-manage-message
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage Guide

### 1. Create a Bot Profile

1. Visit [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot: `/newbot`
3. Follow the instructions to get your **Bot Token**
4. In the app, click **"Add Profile"**
5. Enter your bot name and token
6. Click **"Add Profile"**

### 2. Select Active Profile

- Use the dropdown to select which bot to use
- Your selection is automatically saved

### 3. Compose Your Message

- **Text**: Enter your message in the textarea
- **Format**: Choose from Markdown, HTML, or Plain Text
- **Chat IDs**: Enter recipient chat IDs (see formats below)
- **Image**: Optionally upload an image

### 4. Import Chat IDs from Database (Optional)

The app supports importing chat IDs directly from your database:

#### **Demo Mode (No Installation Required)**
- Works out of the box with sample data
- Perfect for testing the import functionality
- Returns 8 sample records with various ID formats

#### **Production Mode (Real Database)**
1. Install the required database driver:
   ```bash
   # For PostgreSQL
   pnpm add pg @types/pg

   # For MySQL
   pnpm add mysql2 @types/mysql2

   # For MongoDB
   pnpm add mongodb @types/mongodb
   ```

2. Create a database profile:
   - Click **"Database Profiles"** section
   - Add your database connection URL
   - Test the connection

3. Import IDs:
   - Click **"Import from Database"** in Message Composer
   - Select your database profile
   - Write your SQL/MongoDB query
   - Click **"Execute Query"**
   - Select which ID columns to import
   - Imported IDs are added to your chat IDs field

#### **Supported ID Formats**
The import function automatically detects and parses:
- `id` - Standard ID field
- `message_id` - Message identifiers
- `user_id` - User identifiers
- `chat_id` - Chat identifiers
- `from_id` - Sender identifiers

#### **Sample Queries**
```sql
-- PostgreSQL/MySQL: Get active users
SELECT user_id FROM users WHERE active = true;

-- PostgreSQL/MySQL: Get recent chats
SELECT DISTINCT chat_id FROM messages
WHERE created_at > NOW() - INTERVAL '7 days';

-- MongoDB: Find active users
{"status": "active"}
```

### 4. Send Messages

- Click **"Send Message"**
- View success/error notifications
- Messages are sent to all specified chats

## 🎯 Chat ID Formats

The app supports multiple ways to specify chat IDs:

### Format 1: Comma-separated
```
123456789,987654321,555666777
```

### Format 2: Array notation
```
[123456789,987654321,555666777]
```

### Format 3: Object array
```
[{id:123456789}, {id:987654321}, {id:555666777}]
```

### How to Get Chat IDs

- **Personal Chat**: Your user ID (use [@userinfobot](https://t.me/userinfobot))
- **Group/Channel**: Group/Channel ID (use [@getidsbot](https://t.me/getidsbot))

## 🔧 Network Diagnostics

If you encounter connection issues:

1. Click **"Network Diagnostics"** on the main page
2. Or visit: `http://localhost:3000/diagnostics`
3. Check DNS resolution and HTTP connectivity
4. Follow troubleshooting suggestions

### Common Issues

- **DNS Resolution Failed**: Change DNS servers or use VPN
- **HTTP Connection Failed**: Check firewall/antivirus settings
- **Telegram Blocked**: Use VPN to access Telegram API

## 🛠️ Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm format

# Testing
pnpm test
```

### Project Structure

```
├── app/
│   ├── components/          # Vue components
│   │   ├── BotProfileManager.vue
│   │   ├── MessageComposer.vue
│   │   └── TelegramPreview.vue
│   ├── composables/         # Vue composables
│   │   └── useTelegram.ts
│   ├── pages/               # Nuxt pages
│   │   ├── index.vue
│   │   └── diagnostics.vue
│   ├── server/              # Server API routes
│   │   └── api/telegram/
│   │       ├── sendMessage.post.ts
│   │       └── diagnostics.get.ts
│   └── stores/              # Pinia stores
│       └── botProfiles.ts
├── components/ui/           # Shadcn-Vue components
├── constants/               # App constants
├── layouts/                 # Nuxt layouts
├── plugins/                 # Nuxt plugins
├── public/                  # Static assets
└── utils/                   # Utility functions
```

## 🔒 Security Considerations

### Current Implementation (Development)
- Bot tokens stored in browser cookies
- Suitable for personal use and development
- Client-side storage only

### Production Recommendations
- Implement user authentication
- Use server-side session storage
- Encrypt sensitive data
- Rate limiting on API routes
- Environment variables for API keys

## 🌐 API Reference

### Server Endpoints

#### POST `/api/telegram/sendMessage`
Send a message via Telegram Bot API

**Request Body:**
```json
{
  "botToken": "YOUR_BOT_TOKEN",
  "chatId": "CHAT_ID",
  "text": "Message text",
  "parseMode": "Markdown",
  "photo": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ok": true,
    "result": {
      "message_id": 123,
      "chat": {
        "id": 123456789,
        "type": "private"
      },
      "text": "Message text"
    }
  }
}
```

#### GET `/api/telegram/diagnostics`
Network connectivity diagnostics

**Response:**
```json
{
  "timestamp": "2025-11-07T11:20:00.000Z",
  "checks": {
    "dns": {
      "status": "success",
      "addresses": ["149.154.167.220"]
    },
    "http": {
      "status": "success",
      "note": "Telegram API is reachable"
    }
  }
}
```

#### POST `/api/database/testConnection`
Test database connection

**Request Body:**
```json
{
  "databaseUrl": "postgresql://user:pass@host:5432/dbname"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection successful",
  "databaseType": "postgresql"
}
```

#### POST `/api/database/query`
Execute database query and return results

**Request Body:**
```json
{
  "databaseUrl": "postgresql://user:pass@host:5432/dbname",
  "query": "SELECT id, name FROM users WHERE active = true",
  "demoMode": false
}
```

**Response (Real Query):**
```json
{
  "success": true,
  "data": [
    { "id": 123, "name": "User 1" },
    { "id": 456, "name": "User 2" }
  ],
  "count": 2,
  "demoMode": false
}
```

**Response (Demo Mode):**
```json
{
  "success": true,
  "data": [
    { "id": 123456789, "name": "User 1", "active": true },
    { "message_id": 555666777, "chat_id": 111222333 }
  ],
  "count": 8,
  "demoMode": true,
  "message": "Demo mode: Returning sample data. Install database drivers for real queries."
}
```

**Supported Databases:**
- **PostgreSQL** - Requires `pg` package
- **MySQL** - Requires `mysql2` package
- **MongoDB** - Requires `mongodb` package

## 🎨 UI Components

Built with Shadcn-Vue components:
- **Card** - Content containers
- **Button** - Interactive elements
- **Input/Textarea** - Form controls
- **Select** - Dropdown selections
- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Badge** - Status indicators
- **Toast** - Notifications

## 📦 Dependencies

### Core
- **Nuxt 3** - Vue.js framework
- **Pinia** - State management
- **Vue 3** - Reactive framework
- **TypeScript** - Type safety

### UI & Styling
- **Shadcn-Vue** - UI component library
- **Tailwind CSS** - Utility-first CSS
- **Lucide Vue Next** - Icons
- **Vue Sonner** - Toast notifications

### Utilities
- **@vueuse/core** - Vue composition utilities
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes
- **tailwind-merge** - Class merging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Nuxt 3](https://nuxt.com/) - The framework
- [Shadcn-Vue](https://www.shadcn-vue.com/) - UI components
- [Telegram Bot API](https://core.telegram.org/bots/api) - Messaging platform
- [Pinia](https://pinia.vuejs.org/) - State management

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/telegram-bot-manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/telegram-bot-manager/discussions)
- **Telegram**: [@BotFather](https://t.me/BotFather) for bot creation

---

**Happy messaging!** 🎉

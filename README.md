# ChatGPT Clone

A modern AI-powered chatbot UI built with React 19 and integrated with Google's Gemini Generative AI API. This clone simulates the experience of ChatGPT, allowing real-time interaction with an intelligent assistant.

## 🚀 Features

- ⚡ Built with React 19 and Vite for blazing-fast development
- 🧠 Integrates Gemini API (`@google/generative-ai`)
- 🧩 Clean and modular component structure
- 🎨 Beautiful icons via `react-icons`
- ✅ ESLint support for code quality
- 💬 Multiple chat sessions with localStorage persistence
- 🎭 Smooth animations and transitions
- 🌙 Dark/Light mode toggle
- 📱 **Fully mobile responsive design**
- 🖥️ **Desktop and mobile sidebar experience**

## 📦 Tech Stack

- **Frontend:** React 19, Vite, React Icons
- **AI Integration:** Google Gemini API
- **Tooling:** ESLint, TypeScript (if enabled), Vite Plugin React

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatgpt_clone.git
cd chatgpt_clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

1. **Get your Gemini API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Add your API key to `.env`:**
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

### API Key Security

- ✅ API key is stored in `.env` file (not committed to git)
- ✅ `.env` is included in `.gitignore`
- ✅ Example file (`.env.example`) provided for setup

---

## 🎯 Usage

### Desktop Experience
- Sidebar is always visible on the left
- Click the hamburger icon to expand/collapse sidebar text
- Start a new chat or select from recent chats

### Mobile Experience
- Sidebar is hidden by default for a clean interface
- Tap the floating hamburger button to open the sidebar
- Sidebar slides in with overlay; tap outside to close
- "New chat" and "Recent chats" text and icons appear when sidebar is open
- All chat features work seamlessly on mobile

### General Usage
1. **Start a new chat:** Click the "+" icon or "New chat" button
2. **Send messages:** Type in the input box and press Enter or click send
3. **View recent chats:** Click the hamburger menu to see your chat history
4. **Load previous chats:** Click on any recent chat to continue the conversation
5. **Toggle dark mode:** Click the sun icon in the bottom right

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Chat/           # Chat interface components
│   ├── Sidebar/        # Navigation and chat history
│   ├── darkMode/       # Dark/light mode toggle
│   └── Separation/     # Visual separator
├── geminiAPI/          # Gemini API integration
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

---

## 🚀 Deployment

This is a frontend-only application. For production deployment:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform:**
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

**Note:** Remember to set up environment variables in your deployment platform.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

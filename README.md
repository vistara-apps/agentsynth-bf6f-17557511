
# AgentSynth

An AI-powered agentic notes app for Base that helps users organize thoughts, summarize content, draft blog posts, and manage microtransactions with USDC.

## Features

- **AI-Powered Content Drafting**: Transform notes into polished blog posts and articles
- **Smart Content Summarization**: Get concise summaries of lengthy content
- **Agentic Note Organization**: Intelligent system for organizing and linking notes
- **USDC Microtransaction Integration**: Seamless payments on Base network
- **MiniKit Integration**: Built for Farcaster and Base ecosystem

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - OpenAI API key for content generation
   - Supabase credentials for data storage
   - OnchainKit API key for Base integration

3. **Set up database**:
   Create the required tables in Supabase using the SQL in `.env.example`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Blockchain**: Base network with OnchainKit and MiniKit
- **AI**: OpenAI API for content generation and summarization
- **Database**: Supabase for persistent storage
- **Payments**: USDC microtransactions via MiniKit

## Design System

The app uses a cohesive design system with:
- **Colors**: Professional blue/teal palette
- **Typography**: Clean, readable fonts
- **Components**: Modular, reusable UI components
- **Animations**: Smooth transitions and micro-interactions

## Usage

1. **Connect Wallet**: Use MiniKit to connect your Base wallet
2. **Create Notes**: Write and organize your thoughts with tags
3. **Generate Content**: Transform notes into polished articles
4. **Summarize Content**: Get quick summaries of long texts
5. **Pay with USDC**: Seamless microtransactions for AI features

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- OnchainKit & MiniKit
- OpenAI API
- Supabase
- Base Network

## License

MIT License

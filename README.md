# SpurCommerce AI Chat Widget

This repository contains the frontend and backend implementation of an AI-powered customer support chat widget for **SpurCommerce**.

##  How to Run Locally

### 1. Install Dependencies
Make sure you have Node.js and `pnpm` installed.
```bash
pnpm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root of the project. We are using **GitHub Models** to access premium AI models for free without regional restrictions. You will need a GitHub Fine-Grained Personal Access Token.
```env
# .env.local
GITHUB_TOKEN=your_github_token_here
```

### 3. Set Up the Database
We use **Prisma** with **SQLite** for a frictionless zero-config local database experience.
```bash
# Push the schema to create the local database
pnpm exec prisma db push

```

### 4. Start the Development Server
```bash
pnpm dev
```
Navigate to `http://localhost:3000` to interact with the store and the chat widget.

---

##  Architecture Overview

The application is structured to ensure a clean **separation of concerns**:

*   **Frontend UI (`components/chat/`)**: React components (e.g., `chat-container`, `message-list`) handling the presentation layer.
*   **State Management (`lib/hooks/use-chat.ts`)**: A custom React hook that encapsulates the chat logic, handles API fetching, optimistic UI updates, and session management using `localStorage`.
*   **API Routes (`app/api/chat/`)**: Next.js App Router API endpoints that act as the controller. They validate input (e.g., max length) and orchestrate the DB and AI services.
*   **Database Service (`lib/db/prisma.ts`)**: Prisma ORM singleton to manage database connections.
*   **AI Service (`lib/ai/github.ts`)**: An encapsulated module using the official `openai` SDK mapped to the GitHub Models endpoint. If we want to switch providers, we only touch this single file.

### Interesting Design Decisions
*   **Extensible Schema**: The `Conversation` model in Prisma includes a `channel` field (defaulting to `"web"`). This explicitly paves the way for a future omnichannel integration (e.g., `whatsapp`, `instagram`) without requiring major rewrites.
*   **Chat Reset**: Implemented a UX-friendly "I got my answer" button that clears the `sessionId` from `localStorage` and resets the UI, allowing a user to seamlessly start a new conversation.

---

##  LLM Notes

*   **Provider**: We are using **GitHub Models** via the standard OpenAI SDK (pointing to `models.inference.ai.azure.com`).
*   **Model**: `gpt-4o`.
*   **Prompting Strategy**: The `SYSTEM_PROMPT` (in `lib/ai/prompts.ts`) explicitly injects domain knowledge (e.g., shipping policies, store hours) so the AI acts as a reliable support agent rather than a generic chatbot. We map the database conversation history into an array of system/user/assistant roles to give the LLM full context of the ongoing session.

---

##  Trade-offs & "If I had more time..."

*   **Vector Database (RAG)**: Currently, the store's knowledge base is hardcoded into the system prompt. If I had more time, I would implement Retrieval-Augmented Generation (RAG) using a vector database to dynamically inject context based on the user's query.
*   **Streaming Responses**: The backend currently waits for the full LLM response before replying. In a real product, I would use the Next.js AI SDK to stream the text to the UI for better perceived performance.
*   **Authentication**: The current session is tied anonymously to browser `localStorage`. Integrating NextAuth to link conversations to actual user accounts would be the next logical step.

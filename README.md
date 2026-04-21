# AMDXGoogle

A monolithic repository housing the complete NutriMind architecture.

## Structure

1. **`backend/`**: A production-ready Node.js & Express server connected to Vertex AI (`@google/genai`). It features centralized schema structuring (Zod), clean architecture routes, and fallback processing. 
2. **`frontend/`**: A React application bootstrapped with Vite, utilizing vanilla CSS Modules for premium UI aesthetics.

## Local Development

Both environments maintain their own `.env` parameters. 

**Run Backend:**
```bash
cd backend
npm install
npm run dev
```

**Run Frontend:**
```bash
cd frontend
npm install
npm run dev
```

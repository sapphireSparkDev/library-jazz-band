# Library Jazz Band - Server Setup Guide

This guide explains how to set up and run the backend server for the Library Jazz Band website.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Run the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`

### 3. Run the Frontend

In a separate terminal, run the frontend:

```bash
# From the project root
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:slug` - Get event by slug
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Musicians

- `GET /api/musicians` - Get all musicians
- `POST /api/musicians` - Create new musician
- `PUT /api/musicians/:id` - Update musician
- `DELETE /api/musicians/:id` - Delete musician

## Production Deployment

### Option 1: Separate Frontend and Backend

1. **Backend**: Deploy the `server` folder to a Node.js hosting service (Heroku, Railway, etc.)
2. **Frontend**: Deploy the React app to a static hosting service (Vercel, Netlify, etc.)
3. Update the `API_BASE_URL` in `src/lib/api.ts` to point to your backend URL

### Option 2: Combined Deployment

1. Build the frontend: `npm run build`
2. Serve the built files from the Express server
3. Deploy the entire project to a Node.js hosting service

## How It Works

- The Admin interface now makes API calls to the backend server
- The backend server reads/writes directly to the JSON files in `src/data/`
- All users see the same updated data immediately
- Changes persist across browser sessions and for all users

## Troubleshooting

### Common Issues

1. **"Failed to load data" error**

   - Make sure the backend server is running on port 3001
   - Check that the JSON files exist in `src/data/`

2. **CORS errors**

   - The server includes CORS middleware, but check if your hosting provider requires additional configuration

3. **File permission errors**
   - Ensure the server has write permissions to the `src/data/` directory

### Development Tips

- Use `npm run dev` in the server folder for auto-restart during development
- The server will automatically create/update the JSON files
- All API calls include proper error handling and user feedback

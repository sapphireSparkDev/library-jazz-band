# Netlify Deployment Guide

This guide will help you deploy the Library Jazz Band website to Netlify, including both the frontend React application and the backend API server.

## Prerequisites

- A GitHub account with this repository
- A Netlify account
- The repository should be pushed to GitHub

## Deployment Steps

### 1. Connect Repository to Netlify

1. Go to [Netlify](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub account and select this repository
4. Configure the build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 2. Set Environment Variables

In your Netlify site settings, go to **Site settings** → **Environment variables** and add:

- **Key**: `VITE_ADMIN_PASSWORD`
- **Value**: `your_secure_password_here` (use the same password from your .env file)

This environment variable is used for the admin panel authentication.

### 3. Deploy the Site

1. Netlify will automatically build and deploy your site
2. The build process will:
   - Install dependencies
   - Build the React frontend
   - Set up Netlify functions for the API server

### 4. Verify Deployment

After deployment, test the following:

- **Frontend**: Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
- **Admin Panel**: Visit `/admin` and log in with your admin password
- **API**: Test API endpoints like `/api/events` and `/api/musicians`

## Architecture Overview

### Frontend (React + Vite)

- Built with React 18 and TypeScript
- Styled with Tailwind CSS
- Deployed as static files to Netlify CDN

### Backend (Netlify Functions)

- Express.js server converted to Netlify functions
- API routes available at `/api/*`
- Data stored in JSON files in the repository
- File upload functionality is limited in production (files stored in memory)

### File Structure

```
├── netlify/functions/
│   └── server.js          # Netlify function for API server
├── src/
│   ├── data/              # JSON data files
│   ├── pages/Admin.tsx    # Admin interface
│   └── lib/api.ts         # API client
├── netlify.toml           # Netlify configuration
└── package.json           # Dependencies including server packages
```

## Environment Variables

### Required Variables

- `VITE_ADMIN_PASSWORD` - Password for accessing the admin panel

### How Environment Variables Work

- In development: Loaded from `.env` file
- In production: Set in Netlify dashboard
- Frontend accesses via `import.meta.env.VITE_ADMIN_PASSWORD`

## Admin Panel

The admin panel allows you to:

- Create, edit, and delete events
- Manage musician profiles
- Upload images and media
- Toggle event visibility

**Access**: Visit `/admin` on your deployed site

## API Endpoints

All API endpoints are prefixed with `/api`:

- `GET /api/events` - Get all events
- `GET /api/events/:slug` - Get specific event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `GET /api/musicians` - Get all musicians
- `POST /api/musicians` - Create new musician
- `PUT /api/musicians/:id` - Update musician
- `DELETE /api/musicians/:id` - Delete musician
- `POST /api/upload` - Upload files (limited functionality)
- `GET /api/health` - Health check

## Data Storage

- Events data: `src/data/events.json`
- Musicians data: `src/data/musicians.json`
- Data is committed to the repository
- Changes made through the admin panel will update these files

## Limitations

### File Uploads

- File uploads in production use memory storage
- Uploaded files are not persisted between function invocations
- For production file uploads, consider using:
  - Netlify Large Media
  - Cloudinary
  - AWS S3

### Data Persistence

- Data is stored in JSON files in the repository
- Changes require Git commits
- For more dynamic data, consider using a database

## Troubleshooting

### Common Issues

1. **Build fails**

   - Check Netlify build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API endpoints return 404**

   - Check netlify.toml redirects
   - Verify Netlify function is deployed
   - Test with `/api/health` endpoint

3. **Admin panel authentication fails**

   - Verify `VITE_ADMIN_PASSWORD` is set in Netlify
   - Check browser console for errors
   - Clear browser localStorage

4. **File uploads not working**
   - This is expected in production
   - Use external storage service for file uploads

### Development vs Production

- **Development**: Uses local Express server on port 3001
- **Production**: Uses Netlify functions
- API base URL automatically switches between environments

## Maintenance

### Updating Content

- Use the admin panel for day-to-day content management
- Changes will be committed to the repository
- Netlify will automatically redeploy on Git pushes

### Security

- Admin password is stored as environment variable
- No user authentication system for public content
- Consider implementing additional security for sensitive operations

## Support

For deployment issues:

1. Check Netlify build logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for frontend errors

For code issues:

1. Review the project documentation
2. Check the GitHub repository issues
3. Contact the development team

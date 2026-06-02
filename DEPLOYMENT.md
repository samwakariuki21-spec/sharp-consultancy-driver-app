# Sharp Consultancy Driver App - Deployment Guide

## What This Folder Contains

This is the complete website and backend for Sharp Consultancy Limited school driver jobs.

It includes:
- Driver job search
- WhatsApp request submission to 0711608769
- Employer dashboard
- Driver-to-school and school-to-driver email flow
- SMS/email notification backend
- Interview calendar from 1970 to 2080
- Render free hosting setup through `render.yaml`

## Free Hosting Option

Recommended free host: Render

Render can run this Node.js backend using:

```text
Start command: node server.js
```

## Steps To Put Online

1. Create or open a GitHub account.
2. Create a new repository.
3. Upload all files from this folder, except `.env` if it exists.
4. Create or open a Render account.
5. Choose New > Blueprint.
6. Connect the GitHub repository.
7. Render will read `render.yaml`.
8. Add your secret environment variables in Render:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `AFRICASTALKING_USERNAME`
   - `AFRICASTALKING_API_KEY`
   - `AFRICASTALKING_SENDER_ID`
9. Deploy.

## Important

Do not upload `.env` online. Use `.env.example` as the guide and add real secrets in Render environment variables.

Render free hosting is good for testing, but the free server can sleep when idle. For permanent records, connect a real database later.

## Local Test

If Node.js is installed, run:

```powershell
npm start
```

Then open:

```text
http://127.0.0.1:4173/
```

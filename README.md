# Sharp Consultancy Limited Driver Jobs App

## Best-Fit Backend

This project now includes a dependency-free Node.js backend in `server.js`.

It is a good fit because it:
- Serves the website/app.
- Stores jobs, driver applications, reviews, and notifications in `data/db.json`.
- Prepares and sends SMS through Africa's Talking when credentials are configured.
- Sends email through Resend when credentials are configured.
- Keeps working locally even before live SMS/email credentials are added.
- Runs on Render's free Node web service plan for testing or a small prototype.
- Includes a 1970-2080 calendar for interviews, document reviews, and follow-ups.

## Best Free Hosting Choice

Use Render for the first online backend:

1. Create a free Render account.
2. Push this folder to a GitHub repository.
3. In Render, choose New > Blueprint and connect the repository.
4. Render will read `render.yaml` and create the free web service.
5. Add these secret environment variables in Render:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `AFRICASTALKING_USERNAME`
   - `AFRICASTALKING_API_KEY`
   - `AFRICASTALKING_SENDER_ID` if you have one
6. Open the generated Render URL after deployment.

Important: Render free web services are good for testing, but they sleep when idle and their local filesystem is temporary. For long-term live records, connect a real database such as Supabase or Render Postgres.

Current official references checked on June 2, 2026:
- Render free services: https://render.com/docs/free
- Vercel Hobby/free pricing: https://vercel.com/pricing
- Netlify pricing/free plan: https://www.netlify.com/pricing/
- Resend email pricing: https://resend.com/pricing

## Run Locally

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.js
```

Open:

```text
http://127.0.0.1:4173/
```

## Configure SMS and Email

Copy `.env.example` values into your environment variables before starting the server.

Recommended providers:
- SMS in Kenya: Africa's Talking
- Email: Resend

Without credentials, the app still saves notifications in the staff portal notification queue, but live SMS/email delivery is skipped.

## Email Flow

- Driver submits a request: owner gets SMS/email, and the school gets an email when the job has a school/employer email.
- School confirms an interview: driver gets SMS/email and the school gets an email copy.
- School approves or rejects: driver gets SMS/email and the school gets an email copy.
- Staff can also open draft emails from the request card: Email Samuel, Email School, and Email Driver.

## Calendar

The Employers tab includes a calendar section with year options from 1970 through 2080. Use it for interviews, document reviews, school follow-ups, and driver follow-ups.

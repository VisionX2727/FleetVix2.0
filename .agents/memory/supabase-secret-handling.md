---
name: Supabase secret handling
description: Credential hygiene for Supabase authentication and deployments.
---

Supabase project configuration must be injected through Replit environment values. Do not store the project URL, publishable key, anon key, service-role key, or database URL in tracked project files or Git history.

**Why:** A tracked Replit configuration file can be copied to GitHub and deployment providers, and removing a value later does not invalidate credentials that were already exposed.

**How to apply:** Keep `.replit` free of Supabase values, ignore local `.env` and key files, request fresh values through the secure secrets flow, and rotate any key that appeared in committed history.

Shell commands may not receive Replit Secrets even when managed workflows do. A shell expansion such as `DATABASE_URL="$SUPABASE_DB_URL"` can therefore be empty or point at a different fallback database.

**Why:** An external schema operation can otherwise target the Replit-managed database instead of the app's Supabase project.

**How to apply:** Run Supabase schema operations only in a secret-injected managed workflow and verify the configured Supabase project identity before any writes.

Replit Secrets and Vercel environment variables are separate. A Replit remix may show secret names without copying their values, and those values do not populate a connected Vercel project's Production environment.

**Why:** The frontend can still complete Google sign-in while the server-side database URL is missing, causing workspace API requests to fail after authentication.

**How to apply:** Check server-only database settings in the environment that runs the API; set `SUPABASE_DB_URL` separately in Vercel Production when the API is hosted there.
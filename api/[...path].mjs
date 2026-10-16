// Vercel runs the existing authenticated Express API as a serverless function.
// Keeping the API on this deployment avoids proxying requests to a separately
// published Replit app.
import app from "../artifacts/api-server/dist/app.mjs";

export default app;

// Vercel runs the same Express API when the project Root Directory is set to
// this artifact instead of the repository root.
import app from "../../api-server/dist/app.mjs";

export default app;

// Vercel runs the existing authenticated Express API as a serverless function.
// Keeping the API on this deployment avoids proxying requests to a separately
// published Replit app.
import app from "../artifacts/api-server/dist/app.mjs";

const apiGroups = new Set(["healthz", "workspace", "support", "admin", "fleetu"]);
const internalPathParameter = "__fleetx_original_api_path";

export default function handler(req, res) {
  const requestUrl = new URL(req.url || "/", "http://vercel.local");
  const originalPath = requestUrl.searchParams.get(internalPathParameter);

  if (originalPath) {
    const segments = originalPath.split("/").filter(Boolean);
    const currentGroup = requestUrl.pathname.match(/^\/api\/([^/]+)\/?$/)?.[1];
    const requestedGroup = segments[0];

    if (
      !requestedGroup ||
      requestedGroup !== currentGroup ||
      !apiGroups.has(requestedGroup) ||
      segments.some((segment) => segment === "." || segment === "..")
    ) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    requestUrl.searchParams.delete(internalPathParameter);
    const routedPath = segments.map((segment) => encodeURIComponent(segment)).join("/");
    req.url = `/api/${routedPath}${requestUrl.search}`;
  }

  return app(req, res);
}

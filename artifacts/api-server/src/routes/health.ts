import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { pool } from "@workspace/db";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

const workspaceSchemaProbes = [
  {
    table: "fleet_workspaces",
    query: `SELECT owner_user_id, invite_code, state, created_at, updated_at
      FROM public.fleet_workspaces LIMIT 0`,
  },
  {
    table: "fleet_members",
    query: `SELECT id, owner_user_id, driver_user_id, profile, created_at, updated_at
      FROM public.fleet_members LIMIT 0`,
  },
  {
    table: "fleet_invoices",
    query: `SELECT id, owner_user_id, driver_user_id, title, html, revoked_at, created_at
      FROM public.fleet_invoices LIMIT 0`,
  },
] as const;

function postgresErrorCode(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = error.code;
    if (typeof code === "string") return code;
  }
  return "DATABASE_CHECK_FAILED";
}

router.get("/healthz/database", async (req, res): Promise<void> => {
  try {
    await pool.query("SELECT 1");
  } catch (error) {
    const errorCode = postgresErrorCode(error);
    req.log.error({ errorCode }, "Database connection readiness check failed");
    res.status(503).json({
      status: "not_ready",
      database: "unavailable",
      errorCode,
    });
    return;
  }

  for (const probe of workspaceSchemaProbes) {
    try {
      await pool.query(probe.query);
    } catch (error) {
      const errorCode = postgresErrorCode(error);
      const failure = {
        status: "not_ready",
        database: "connected",
        schema: "incomplete",
        failedTable: probe.table,
        errorCode,
      };
      req.log.error(failure, "Database schema readiness check failed");
      res.status(503).json(failure);
      return;
    }
  }

  res.json({
    status: "ok",
    database: "connected",
    schema: "ready",
  });
});

export default router;

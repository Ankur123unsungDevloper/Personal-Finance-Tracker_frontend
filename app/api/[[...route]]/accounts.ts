import { Hono } from "hono";
import { eq } from "drizzle-orm";
import {zValidator} from "@hono/zod-validator"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";


const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401);
      }
      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts);
      return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator,
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      return c.json({});
  })
export default app;
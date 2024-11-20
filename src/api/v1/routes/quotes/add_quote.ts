import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// ** Import the database and schema
import { db } from "@/db";
import { quotes } from "@/db/schema";

// ** import validation
import { quoteSchema } from "@/validation";

const add_quote = new Hono();

add_quote.post("/add", zValidator("json", quoteSchema), async (c) => {
  try {
    const payload = c.req.valid("json");

    const result = await db.insert(quotes).values(payload).returning();

    // Return a success response
    return c.json(
      {
        success: true,
        message: "New quotes added successfully!",
        data: result[0],
      },
      201
    );
  } catch (error: any) {
    console.error("Error inserting quotes:", error);

    return c.json(
      {
        success: false,
        message: "An error occurred while adding the quotes.",
        error: error?.message,
      },
      500
    );
  }
});

export default add_quote;

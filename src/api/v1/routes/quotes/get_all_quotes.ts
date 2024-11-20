import { Hono } from "hono";

// ** Import the database and schema
import { db } from "@/db";
import { quotes } from "@/db/schema";

const get_all_quote = new Hono();

get_all_quote.get("/all", async (c) => {
  try {
    const result = await db.select().from(quotes);

    return c.json(
      {
        success: true,
        message: "Fetched all quotes successfully!",
        data: result,
      },
      200
    );
  } catch (error: any) {
    console.error("Error fetching quotes:", error);

    return c.json(
      {
        success: false,
        message: "An error occurred while fetching the quotes.",
        error: error?.message,
      },
      500 
    );
  }
});

export default get_all_quote;

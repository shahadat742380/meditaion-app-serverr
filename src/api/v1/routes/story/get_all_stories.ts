import { Hono } from "hono";

// ** Import the database and schema
import { db } from "@/db";
import { stories } from "@/db/schema";

const get_all_stories = new Hono();

get_all_stories.get("/all", async (c) => {
  try {
    const result = await db.select().from(stories);

    return c.json(
      {
        success: true,
        message: "Fetched all stories successfully!",
        data: result,
      },
      200
    );
  } catch (error: any) {
    console.error("Error fetching stories:", error);

    return c.json(
      {
        success: false,
        message: "An error occurred while fetching the stories.",
        error: error?.message,
      },
      500
    );
  }
});

export default get_all_stories;

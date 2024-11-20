import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// ** Import the database and schema
import { db } from "@/db";
import { stories } from "@/db/schema";
import { storySchema } from "@/validation";

const add_story = new Hono();

add_story.post("/add", zValidator("json", storySchema), async (c) => {
  try {
    const payload = c.req.valid("json");

    const result = await db.insert(stories).values(payload).returning();

    return c.json(
      {
        success: true,
        message: `${result.length} stories added successfully!`,
        data: result[0],
      },
      201
    );
  } catch (error: any) {
    console.error("Error inserting stories:", error);

    return c.json(
      {
        success: false,
        message: "An error occurred while adding the stories.",
        error: error?.message,
      },
      500
    );
  }
});

export default add_story;
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// import third party package
import { eq } from "drizzle-orm";

// import db and schema
import { db } from "@/db";
import { stories } from "@/db/schema";

// ** import validation
import { routerParamSchema } from "@/validation";

const get_single_story_route = new Hono();

get_single_story_route.get(
  "/:id",
  zValidator("param", routerParamSchema("Story")),
  async (c) => {
    try {
      const { id: story_id } = c.req.param();

      const story = await db.query.stories.findFirst({
        where: eq(stories.id, story_id),
      });

      if (!story) {
        return c.json(
          {
            success: false,
            message: "Story not found!",
          },
          404
        );
      }

      // Return a success response with the vehicle data
      return c.json(
        {
          success: true,
          message: "Story fetched successfully!",
          data: story,
        },
        200
      );
    } catch (error) {
      console.error("Error fetching the story:", error);
      return c.json(
        { error: "Internal server error! Failed to fetch story" },
        500
      );
    }
  }
);

export default get_single_story_route;

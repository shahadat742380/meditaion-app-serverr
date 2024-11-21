import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// ** import third-party package
import { eq } from "drizzle-orm";

// ** import db and schema
import { db } from "@/db";
import { users } from "@/db/schema";

// ** import validation
import { getProfileSchema } from "@/validation";

const auth_profile = new Hono();

auth_profile.get(
  "/profile/:email",
  zValidator("param", getProfileSchema),
  async (c) => {
    try {
      const { email: user_email } = c.req.param();

      const userExist = await db.query.users.findFirst({
        where: eq(users.email, user_email),
      });

      if (!userExist) {
        return c.json(
          {
            success: false,
            message: "User not found!",
          },
          404
        );
      }

      // Return a success response
      return c.json(
        {
          success: true,
          message: "User Profile fetched successfully!",
          data: userExist,
        },
        200
      );
    } catch (error) {
      console.error("Error fetching the user profile:", error);
      return c.json(
        { error: "Internal server error! Failed to fetch user Profile" },
        500
      );
    }
  }
);

export default auth_profile;

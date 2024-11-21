import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// Import third-party package
import { eq } from "drizzle-orm";

// Import db and schema
import { db } from "@/db";
import { getProfileSchema, updateProfileSchema } from "@/validation";
import { users } from "@/db/schema";

const update_profile = new Hono();

update_profile.patch(
  "/update/:email",
  zValidator("json", updateProfileSchema),
  zValidator("param", getProfileSchema),
  async (c) => {
    try {
      const { profile_image, date_of_birth, gender, mobile_number } =
        c.req.valid("json");
      const { email: user_email } = c.req.param();

      // Check if the user exists
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

      // Perform the update
      const updatedUser = await db
        .update(users)
        .set({
          profile_image,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
          gender,
          mobile_number,
        })
        .where(eq(users.email, user_email))
        .returning();

      // Respond with the updated user data
      return c.json(
        {
          success: true,
          message: "User profile updated successfully",
          data: updatedUser[0], // Return the updated user data
        },
        200
      );
    } catch (error) {
      console.error("Error during profile update:", error);
      return c.json(
        {
          success: false,
          message: "Internal server error occurred while updating profile.",
        },
        500
      );
    }
  }
);

export default update_profile;

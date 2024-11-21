import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// ** import third party package
import { eq } from "drizzle-orm";

// ** import db and schema
import { db } from "@/db";
import { users } from "@/db/schema";

// ** import validation
import { userSchema } from "@/validation";

const sign_up = new Hono();

sign_up.post("/sign-up", zValidator("json", userSchema), async (c) => {
  try {
    const payload = c.req.valid("json");

    const isUserExist = await db.query.users.findFirst({
      where: eq(users.email, payload.email),
    });

    if (isUserExist && isUserExist.email === payload.email) {
      return c.json(
        {
          success: true,
          message: "User already exists.",

          data: {
            id: isUserExist.id,
          },
        },
        200
      );
    }

    const formattedPayload = {
      ...payload,
      date_of_birth: payload.date_of_birth
        ? new Date(payload.date_of_birth)
        : null,
        
    };
    const result = await db.insert(users).values(formattedPayload).returning();

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

export default sign_up;

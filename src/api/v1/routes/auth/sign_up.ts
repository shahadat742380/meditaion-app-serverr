import { Hono } from "hono";

const sign_up = new Hono();

sign_up.post("/sign-up", async (c) => {
  return c.json(
    {
      success: true,
      message: "Sign up successfully!",
      data: "Data",
    },
    201
  );
});

export default sign_up;

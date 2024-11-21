import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";


// ** import validation
import { userSchema } from "@/validation";

const google_sign_up = new Hono();

google_sign_up.post(
  "/google-sign-up",
  zValidator("json", userSchema),
  async (c) => {
    
  }
);

export default google_sign_up;

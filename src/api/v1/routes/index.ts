import { Hono } from "hono";

import { env } from "@/config/env";

const v1_api_route = new Hono();


v1_api_route.get("/", (c) => {
  console.log(env.DATABASE_URL);
  
  return c.text("The V1 Server is running...!");
});

export default v1_api_route;

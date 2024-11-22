import { Hono } from "hono";

// ** import libs
import { auth } from "@/lib/auth";

// ** import routes
import sign_up from "./sign_up";
import auth_profile from "./auth_profile";
import update_profile from "./update_profile";

const auth_route = new Hono();

// ** customer Auth routes
auth_route.get("/*", (c) => auth.handler(c.req.raw));
auth_route.post("/*", (c) => auth.handler(c.req.raw));
auth_route.route("/", sign_up);
auth_route.route("/", auth_profile);
auth_route.route("/", update_profile);

export default auth_route;

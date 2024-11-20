import { Hono } from "hono";

// ** import routes
import sign_up from "./sign_up";

const auth_route = new Hono();

// ** customer vehicle routes
auth_route.route("/", sign_up);

export default auth_route;

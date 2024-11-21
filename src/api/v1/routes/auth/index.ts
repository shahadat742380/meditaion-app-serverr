import { Hono } from "hono";

// ** import routes
import sign_up from "./sign_up";
import auth_profile from "./auth_profile";
import update_profile from "./update_profile";

const auth_route = new Hono();

// ** customer vehicle routes
auth_route.route("/", sign_up);
auth_route.route("/", auth_profile);
auth_route.route("/", update_profile);

export default auth_route;

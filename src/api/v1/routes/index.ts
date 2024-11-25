import { Hono } from "hono";

// ** import routes
import quote_route from "./quotes";
import story_route from "./story";
import auth_route from "./auth";

const v1_api_route = new Hono();

v1_api_route.route("/auth", auth_route);
v1_api_route.route("/quote", quote_route);
v1_api_route.route("/story", story_route);

export default v1_api_route;

import { Hono } from "hono";

// ** import routes
import add_story from "./add_story";
import get_all_stories from "./get_all_stories";
import get_single_story_route from "./get_single_story";

// import auth routes
const story_route = new Hono();

// customer vehicle routes
story_route.route("/", add_story);
story_route.route("/", get_all_stories);
story_route.route("/", get_single_story_route);

export default story_route;

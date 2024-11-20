import { Hono } from "hono";

// ** import routes
import add_quote from "./add_quote";
import get_all_quote from "./get_all_quotes";
import get_single_quote_route from "./get_single_quote";

// import route

// import auth routes
const quote_route = new Hono();

// customer vehicle routes
quote_route.route("/", add_quote);
quote_route.route("/", get_all_quote);
quote_route.route("/", get_single_quote_route);

export default quote_route;

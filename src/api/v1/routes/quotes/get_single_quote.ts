import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// import third party package
import { eq } from "drizzle-orm";

// import db and schema
import { db } from "@/db";
import { quotes } from "@/db/schema";

// ** import validation
import { routerParamSchema } from "@/validation";

const get_single_quote_route = new Hono();

get_single_quote_route.get(
  "/:id",
  zValidator("param", routerParamSchema("Quote")),
  async (c) => {
    try {
      const { id: quote_id } = c.req.param();

      const quote = await db.query.quotes.findFirst({
        where: eq(quotes.id, quote_id),
      });

      if (!quote) {
        return c.json(
          {
            success: false,
            message: "Quote not found!",
          },
          404
        );
      }

      // Return a success response with the vehicle data
      return c.json(
        {
          success: true,
          message: "Quote fetched successfully!",
          data: quote,
        },
        200
      );
    } catch (error) {
      console.error("Error fetching the Quote:", error);
      return c.json(
        { error: "Internal server error! Failed to fetch Quote" },
        500
      );
    }
  }
);

export default get_single_quote_route;

import { Express } from "express-serve-static-core";
import { get } from "../controllers/test-controller";

export const testRoute = (app: Express) => {
  app.get("/testRoute", get);
};

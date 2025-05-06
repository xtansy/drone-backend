import { Express } from "express-serve-static-core";

import { getAllPoints } from "../controllers";

export const pointRoutes = (app: Express) => {
  app.get("/getAllPoints", getAllPoints);
};

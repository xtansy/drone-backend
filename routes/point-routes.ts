import { Express } from "express-serve-static-core";

import { getAllPoints, getPointById } from "../controllers";

export const pointRoutes = (app: Express) => {
  app.get("/getAllPoints", getAllPoints);
  app.get("/getPointById/:pointId", getPointById);
};

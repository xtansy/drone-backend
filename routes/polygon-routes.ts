import { Express } from "express-serve-static-core";

import {
  getAllPolygons,
  deleteAllPolygons,
  deletePolygonById,
  getPolygonById,
} from "../controllers";

export const polygonRoutes = (app: Express) => {
  app.get("/getAllPolygons", getAllPolygons);
  app.get("/getPolygonById/:polygonId", getPolygonById);
  app.delete("/deleteAllPolygons", deleteAllPolygons);
  app.delete("/deletePolygonById/:polygonId", deletePolygonById);
};

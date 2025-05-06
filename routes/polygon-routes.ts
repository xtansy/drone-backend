import { Express } from "express-serve-static-core";

import {
  getAllPolygons,
  deleteAllPolygons,
  deletePolygonById,
} from "../controllers";

export const polygonRoutes = (app: Express) => {
  app.get("/getAllPolygons", getAllPolygons);
  app.delete("/deleteAllPolygons", deleteAllPolygons);
  app.delete("/deletePolygonById/:polygonId", deletePolygonById);
};

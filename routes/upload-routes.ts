import { Express } from "express-serve-static-core";

import { uploadMiddleware } from "../middleware/multer";
import { upload } from "../controllers";

export const uploadRoutes = (app: Express) => {
  app.post("/upload", uploadMiddleware.array("sdData"), upload);
};

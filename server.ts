import express from "express";
import cors from "cors";

import { testRoute, uploadRoutes, polygonRoutes, pointRoutes } from "./routes";
import { mongoDbConnect } from "./mongo/mongoDbConnect";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDbConnect();

testRoute(app);
uploadRoutes(app);
polygonRoutes(app);
pointRoutes(app);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

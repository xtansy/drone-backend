import express from "express";
import cors from "cors";

import { mongoDbConnect } from "./core/mongo";
import { testRoute } from "./routes/test-route";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoDbConnect();

testRoute(app);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

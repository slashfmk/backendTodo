import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

const cors = require("cors");
import express from "express";
const bodyParser = require("body-parser");

const SERVER_ADD: string = "localhost";

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
   origin: "*",
      // origin: [
      //     'http://localhost:3000',
      //     'https://localhost:3000',
      //     'https://www.mywebsite.com'
      // ],
    method: ["POST", "PUT", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);

const imageRoute = require("./routes/todoRoute");

const base_url = `/api/v1`;

app.use(`${base_url}/todos/`, imageRoute);

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res.status(400).json(error);
  }
);

const port = 8000;

app.listen(port, SERVER_ADD, () => {
  console.log(`Server is running on port ${port}`);
});

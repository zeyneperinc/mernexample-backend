import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import recordRoutes from "./routes/record.js";

import dotenv from "dotenv";
//To read the .env-file you'll need to install something that will read that file, for instance the dotenv package

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/records", recordRoutes);

//backend greeting page
app.get("/", (req, res) => {
  res.send("employee backende erisildi");
});

//process.env.PORT will be generated by Heroku after heroku deployment
const PORT = process.env.PORT || 5001;

const DATABASE_HOST = process.env.database_host
const DATABASE_PORT = process.env.database_port
const DATABASE_NAME = process.env.database_name
const DATABASE_USER = process.env.mongodb_user
const DATABASE_PASSWORD = process.env.mongodb_password
//DATABASE_USER.concat(" ").concat(DATABASE_PASSWORD).
const CONNECTION_URL = "mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
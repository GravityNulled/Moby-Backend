const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO)
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log("listening on port 5000");
    })
  )
  .catch((error) => console.log(error));

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./Routes/UserRoute");
const productRoute = require("./Routes/ProductRoute");
const authRoute = require("./Routes/AuthRoute");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
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

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

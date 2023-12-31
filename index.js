// karena menggunakan .env variable, jd lakuin import ini di awal aplikasi jalan
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const ApiError = require("./utils/apiErrors");
const errorHandler = require("./controllers/errorController");
const router = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server jalan di port : ${PORT}`);
});

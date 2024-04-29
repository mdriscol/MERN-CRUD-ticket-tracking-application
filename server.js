const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection')

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));
connectDB();


//log requests
app.use(bodyparser.urlencoded({ extended: true }));

//set view.engine
app.set("view engine", "ejs");

// app.set("views", path.resolve(__dirname, "views/ejs"))
 app.set("views", path.resolve(__dirname, "views"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers

app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
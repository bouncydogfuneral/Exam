const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const proceduresRouter = require("./routes/procedureRoute");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/procedure", proceduresRouter);

module.exports = app;

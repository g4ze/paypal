const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  // tell server is active every 5 seconds
  setInterval(() => {
    console.log("Server is active at port 3000");
  }, 5000);
})
module.exports = app;
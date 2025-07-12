const express = require("express");
const cors = require("cors");
const uploadRouter = require("./routes/uploadRouter");
const resultsRouter = require("./routes/resultsRouter");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", uploadRouter);
app.use("/api", resultsRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Database can't be connected"));

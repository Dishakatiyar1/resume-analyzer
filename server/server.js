const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("resume"), (req, res) => {
  res.status(200).send("File Loaded Successfully!");
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

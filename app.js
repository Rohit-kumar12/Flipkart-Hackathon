const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

const transactionRoute = require("./routes/transaction.routes");

app.use(express.json());

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//routes
app.use("/api/blockchain", transactionRoute);

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});

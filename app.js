const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/inventory", require("./routes/inventory"));

app.listen(port, () => {
  console.log(`📦 Inventory app running at http://localhost:${port}`);
});


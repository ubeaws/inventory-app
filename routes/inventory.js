const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Inventory data coming soon!" });
});

module.exports = router;


const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Users home route");
});

router.post("/register", (req, res) => {
  res.send("inside the register");
});

module.exports = router;

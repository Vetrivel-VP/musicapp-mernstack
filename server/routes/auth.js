const admin = require("../config/firebase.config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return res.status(200).send(decodeValue);
    }
    return res.status(500).json({ message: "Un Authorize" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
});

router.post("/register", (req, res) => {
  res.send("inside the register");
});

module.exports = router;

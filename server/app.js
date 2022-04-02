const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// If any depreciation warning add depreciation options
mongoose.connect(process.env.DB_STRING, () => {
  console.log("Mongodb Connected");
});

app.listen(4000, () => console.log("lisitening to port 4000"));

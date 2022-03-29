const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const middleware = require("./middleware");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
// app.use(middleware.decodeToken);

app.get("/todos", (req, res) => {
  res.json({
    todos: [
      { id: 1, title: "Task 1 " },
      { id: 2, title: "Task 2 " },
    ],
  });
});

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

mongoose.connect(process.env.DB_STRING, () => {
  console.log("Mongodb Connected");
});

app.listen(4000, () => console.log("lisitening to port 4000"));

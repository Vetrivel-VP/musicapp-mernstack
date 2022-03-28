const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./middleware");

app.use(cors({ origin: true }));
app.use(middleware.decodeToken);

app.get("/todos", (req, res) => {
  res.json({
    todos: [
      { id: 1, title: "Task 1 " },
      { id: 2, title: "Task 2 " },
    ],
  });
});

app.listen(4000, () => console.log("lisitening to port 4000"));

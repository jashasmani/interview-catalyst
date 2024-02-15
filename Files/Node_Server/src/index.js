const express = require("express");
const connectDB = require("./DbConnection");
const loginRouter = require("./routes/login.route");
const questionRouter = require("./routes/question.route");
const profileRouter = require("./routes/profile.route");
const commentRouter = require("./routes/comments.route");
const likeRouter = require("./routes/like.route");
const cheackEditRoute = require("./routes/cheackEditAnswer.route");

const cors = require("cors");
const configcors = {
  origin: "*",
  credential: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(configcors));
app.use(cors(configcors));

const app = express();
const port = 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/user", loginRouter);
app.use("/user", questionRouter);
app.use("/user", profileRouter);
app.use("/user", commentRouter);
app.use("/user", likeRouter);
app.use("/admin", cheackEditRoute);

connectDB();

app.listen(port, () => {
  console.log("Server is running on port", port);
});

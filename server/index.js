import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import path from 'path' ;

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);

app.use(express.static(path.join(__dirname , "../client/build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname,"../client/build/index.html"))
});

const MONGODB_URL ="mongodb+srv://book-store:rRLh8DbZBOxSeA8O@cluster0.nbdsfuf.mongodb.net/?retryWrites=true&w=majority";
const port = 5000;

// app.listen('/' , (req,res)=>{
//    res.send(message: "connected to database");
// });

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

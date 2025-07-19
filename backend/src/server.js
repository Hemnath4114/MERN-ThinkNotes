import dotenv from "dotenv";
dotenv.config();
import express from "express";
import notesRoutes from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js"; 
import rateLimitter from "./middleware/rateLimitter.js";
import cors from 'cors';
import path from 'path';


const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
    app.use(cors(
  {
    origin: "http://localhost:5173",
  }
)); //middleware 

};

app.use(express.json()); //middleware 
app.use(rateLimitter); //middleware

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
};




connectDB().then(() =>{
     app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

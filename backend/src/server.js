import dotenv from "dotenv";
dotenv.config();
import express from "express";
import notesRoutes from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js"; 
import rateLimitter from "./middleware/rateLimitter.js";
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000

app.use(cors(
  {
    origin: "http://localhost:5173",
  }
)); //middleware 
app.use(express.json()); //middleware 
app.use(rateLimitter); //middleware

app.use('/api/notes', notesRoutes);


connectDB().then(() =>{
     app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app ,server} from "./lib/socket.js";





dotenv.config();

const PORT =process.env.PORT ||8000;
const __dirname=path.resolve();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://chat-app-project-tggx.onrender.com",
    credentials:true,
}));


app.use("/api/auth", authRoutes);
    
app.use("/api/message", messageRoutes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

   app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}

server.listen(PORT,()=>{
    console.log("server is running on port:"+ PORT);
    connectDB()
});

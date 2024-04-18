import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/indexRoute.js";
import connectDB from "./models/connection.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import AppError from "./utilities/appError.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
routes(app,express.Router());

dotenv.config();
connectDB()
const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});


app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next) => {
    next(new AppError('Not found', 404));
});
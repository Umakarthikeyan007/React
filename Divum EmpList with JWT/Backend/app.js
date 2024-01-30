const express= require("express");
const cors=require("cors");
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app=express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));
const port=5000;
const routers = require("./Routes/index");
const ErrorHandler = require("./Utils/errorHandler");
app.use(cookieParser());
app.use(routers);
app.use(ErrorHandler);
app.listen(port,()=>{
    console.log("Server Running");
})
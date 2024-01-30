const express = require("express");
const userRouter=require("./User");
const mainUserRouter=require("./mainUser");
const router =express.Router();
const auth = require("./Middleware");
router.use('/Users',auth,userRouter);
router.use('/mainUser',mainUserRouter);
module.exports=router;
const express=require("express");
const Router =require("./User");
const router= express.Router();
router.use('/Users',Router.userRouter);
module.exports=router
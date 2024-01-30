const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const User=require("./Router/index");

const app = express();
app.use(express.json());
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(User);

app.listen(8002, () => {
    console.log("listening on 8000");
});

module.exports=app
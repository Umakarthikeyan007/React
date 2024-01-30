const express = require("express");
const router =express.Router();
const { hashpassword } = require("../Utils/Hashing");
const service = require("../Database/Operations");
const encryptor = require ("../Utils/Encryptor");
const jwtServices = require('../Utils/GetJWT');


router.get('/getParticularUser/:email',async (req,res)=>{
    try {
        const data= req.params.email;
        await service.findUser(data).then(result=>{
            return result;
        })
    } catch (error) {
        return error;
    }
})

router.post('/addUser',async (req,res)=>{
  const body = req.body;
  await service.findUser(body.email).then(async result =>{
   const count=result.rowCount;
   if(count==0){
    const details = [body.email, body.username, await hashpassword(body.password)];
    await service.addUser(details).then(result => {
        res.status(200).json("Account Created Successfully");
    })
  }
  else{
    res.status(409).json("Email Already Exists");
  }
  });
})

router.post('/authenticateUser',async(req,res)=>{
    const email = req.body.email;
    const pwd = req.body.password;
    await service.findUser(email).then(async result=>{
        const count=result.rowCount;
        if(count==1){
            const hashpwd = await service.findUser(email).then(data => {
                const temp = data.rows;
                return temp[0].password;
            })
            const solution = await encryptor.compare(pwd, hashpwd);
            if(solution){
                const token = jwtServices.getToken(email);
                res.cookie('authtoken', token, { expires: new Date(Date.now() + (1000 *120)), httpOnly: true }).status(200).json("Logged In Successfully");
            }
            else{
                res.status(401).json("Incorrect password");
            }
        }
        else if(count==0){
            res.status(510).json("Email doesn't Exists");
        }
    })
})


router.get('/logout',(req,res)=>{
    try {
        if(req.cookies.authtoken){
            res.cookie('authtoken',req.cookies.authtoken,{expires: new Date(Date.now()),httpOnly:true}).status(200).json("Logged Out SuccessFully")
        }
        else{
           res.status(401).json("No Cookie Found");
        }
    } catch (error) {
        console.log(error);
    }

})

module.exports= router;

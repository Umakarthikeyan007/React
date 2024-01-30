const express= require("express");
const router = express.Router();
const service = require("../Database/Operations");
const response = require("../Utils/Response");

router.get('/get',async(req,res)=>{
    await service.getUsers().then(result =>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    })
})

router.get('/get/:email',async(req,res)=>{
    let ref=req.params.email;
    await service.getParticularUser(ref).then(result =>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    })
})

router.post('/add',async(req,res)=>{
    const body=req.body;
    const details=[body.email,body.fname,body.lname,body.mobile,body.dob,body.address];
    await service.addUser(details).then(result =>{
        res.status(response.getStatus(result)).json(response.getAddedMessage(result));
    })
})

router.post('/update',async (req,res)=>{
    const body=req.body;
    const details=[body.fname,body.lname,body.mobile,body.dob,body.address,body.email];
    await service.updateUser(details).then(result=>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    });
})

router.delete('/:email', async (req,res)=>{
    let ref=req.params.email;
    await service.deleteUser(ref).then(result=>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    });
})
module.exports={
  userRouter:router
}
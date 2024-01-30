const express = require("express");
const router = express.Router();
const service = require("../Database/Operations");


router.post('/addEmployee', async (req, res) => {
    const body = req.body;
    await service.findEmployee(body.email).then(async result => {
        const count = result.rowCount;
        if (count == 0) {
            const details = [body.email, body.fname, body.lname, body.dob, body.mobile, body.address];
            await service.addEmployee(details).then(result => {
                res.status(200).json("Data Created Successfully");
            })
        }
        else {
            res.status(409).json("Email Already Exists");
        }
    });
})

router.get('/displaytable', async (req, res) => {
    try {
        await service.displayUsers().then(result => {
            res.status(200).json(result);
        })

    } catch (error) {
        return error;
    }
})

router.get('/getParticularEmployee/:email', async (req, res) => {
    try {
        let ref = req.params.email;
        await service.getParticularEmployee(ref).then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error);
        return error;
    }

})

router.delete('/deleteEmployee/:email', async (req,res)=>{
    let ref=req.params.email;
    console.log(ref);
    await service.deleteEmployee(ref).then(result=>{
        res.status(200).json("Data deleted Successfully");
    });
})

router.post('/updateEmployee',async (req,res)=>{
    const body=req.body;
    const details=[body.fname,body.lname,body.mobile,body.dob,body.address,body.email];
    await service.updateEmployee(details).then(result=>{
        res.status(200).json("Data Updated Successfully");
    });
})


module.exports = router;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const service = require("./Database/Operation");
const encryptor = require("./Utils/Encryptor");
const response = require("./Utils/Response");
const { hashpassword } = require("./Utils/Hashing");
const jwtServices = require('./Utils/GetJWT')
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;


app.post('/add', async (req, res) => {
    const body = req.body;
    const details = [body.email, body.user, await hashpassword(body.password)];
    await service.addUser(details).then(result => {
        res.status(response.getStatus(result)).json(response.getMessage(result));
    })
})

app.post('/authenticateUser', async (req, res) => {
    try {
        const email = req.body.email;
        const pwd = req.body.password;

        const data = await service.findUser(email);

        if (data.rowCount==0) {
            res.status(205).json({
                "kjh":"jkjh"
            });
        }
        else {
            const hashPassword = await service.findUser(email).then(data => {
                const temp = data.rows;
                return temp[0].password;
            })
            const result = await encryptor.compare(pwd, hashPassword);
            if (result) {
                const token = jwtServices.getToken(email);
                res.cookie('authtoken', token, { expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true }).status(200).json({
                    "message": "Valid Data"
                });
            }
            else {
                return error;
            }

        }
    } catch (error) {
        console.log(error);
    }

})

app.get('/find/:email', async (req, res) => {

    try {
        const data = req.params.email;
        await service.findUser(data).then(result => {
            res.status(response.getStatus(result)).json(response.getMessage(result));
        });
    } catch (error) {
        console.log(error);
    }
})

app.post('/addtask',async(req,res)=>{
    const body = req.body;
    const details=[body.task,body.sdate,body.edate,body.description,body.asignee,body.level,body.status,body.rca];
    await service.addTask(details).then(result =>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    })
    
})

app.get('/getAllTask',async(req,res)=>{
    await service.getAllTask().then(result =>{
        res.status(response.getStatus(result)).json(response.getMessage(result));
    })
})

app.listen(port, () => {
    console.log('Server running');
})
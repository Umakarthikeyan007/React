const { response } = require("express");

const getStatus=(result)=>{

    if(result instanceof Error){
        return 205;
    }
    else{
        return 200;
    }
}

const getMessage=(result)=>{
    console.log(result instanceof Error)
    if(result instanceof Error){
        return result.detail;
    }
    else{
        return result;
    }
}
const getAddedMessage=(result)=>{
    console.log(result instanceof Error)
    if(result instanceof Error){
        let message ="Email Already Exists"
        return message; 
        
    }
    else{
        let message="Details Added Successfully"
        return message;
    }
}

module.exports={
    getStatus,
    getMessage,getAddedMessage
}
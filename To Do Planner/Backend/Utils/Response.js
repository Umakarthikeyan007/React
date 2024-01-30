const getStatus=(result)=>{

    if(result instanceof Error){
        return 205;
    }
    else{
        return 200;
    }
}

const getMessage=(result)=>{
    if(result instanceof Error){
        return result.detail;
    }
    else{
        return result;
    }
}
const getAddedMessage=(result)=>{
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
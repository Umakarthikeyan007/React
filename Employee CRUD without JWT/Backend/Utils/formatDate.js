function alterDataForDate(data){
    for(let index=0;index<data.length;index++){
        const date=new Date(data[index].dob);
        data[index].dob=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    }
    return data;
}

module.exports={alterDataForDate}
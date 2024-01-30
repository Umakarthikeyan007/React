const bcrypt = require("bcrypt")
const saltRounds = 10

async function hashpassword(data){
    const hash= await bcrypt.genSalt(saltRounds).then(salt => {
      return bcrypt.hash(data+"", salt)
    })
    .catch(err => console.error(err.message))
    return hash;
}
module.exports={hashpassword};
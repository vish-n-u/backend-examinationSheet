if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const secretKey = process.env.SECRET_KEY
module.exports = {secretKey};
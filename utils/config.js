require('dotenv').config()

const PORT = process.env.PORT || 3001
const url = process.env.MONGODB_URI

module.exports = {
    PORT, 
    url
}
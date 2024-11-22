const { sign, verify } = require("jsonwebtoken")

const pt = process.env.PT
console.log('pt: ', pt);

// 15 days
const expiresIn = 60 * 60 *24 * 15

function createToken(payload) {
   return sign(payload, pt, { algorithm: "HS256", expiresIn })
}


function verifyToken(tok) {
    try {
    return verify(tok, pt, { algorithm: "HS256", expiresIn })
        
    } catch (error) {
       const exp = new Error('token expired')
        exp.href = '/'
        throw exp
    }
 }
 


module.exports = { createToken, verifyToken }
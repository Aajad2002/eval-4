
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    let tok = token.split(" ")[1]
    if (tok) {


        jwt.verify(tok, 'eval', function (err, decoded) {
            if (decoded) {
               req.body.authorID=decoded.authorID
               console.log(decoded)
               next()
            } else {
                res.status(400).send({"err":err})
            }
        });
    }
}
module.exports=auth
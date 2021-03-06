const jwt = require("jsonwebtoken");

module.exports.verifyJwtToken = function(req, res, next){
    var token;
    if('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if(!token) {
        return res.status(400).send({auth: false, message: "No token provided"});

    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
            if(err) {
                return res.status(500).send({auth: false, message:"Token authorization failed"});
                 
            }
            else{
                req._id = decoded._id;
                next();
            }
        });
    }
};
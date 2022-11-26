const jwt = require('jsonwebtoken')  

module.exports = async function(req,res,next){

    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({
            msg:"No token, autorization denied"
        });
    }

 
    try{

        await jwt.verify(token, process.env.jwtUserSecret,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    msg:"invalid token"
                })
            }
            else{
                req.user = decoded.user;
                next();
            }
        });

    }catch(err){
         console.log("something went wrong"+ err);
         res.status(500).json({
            msg:"server error"
         })
    }


}
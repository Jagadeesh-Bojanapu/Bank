const jwt = require('jsonwebtoken');

exports.authenticate = (req,res,next)=>
{
    if(req.session.authorization)
    {
        const token = req.session.authorization['token'];
        if(!token)
        {
            return res.status(401).json({message:"Unauthorized"})
        }
        jwt.verify(token , 'jwt_secret_key',(err,user)=>{
        if(err)
        {
            return res.status(401).json({message:"Unauthorized"})
        }
           req.user_email = req.session.authorization['email'];
           console.log(req.user_email);
           next();
    })
    }
    else{
        res.status(403).json({message:'User not Logged In'})
    }
}
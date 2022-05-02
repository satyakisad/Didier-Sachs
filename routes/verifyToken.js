const jwt = require('jsonwebtoken')


const verifyToken= (req,res,next)=> //authentication
{
    const authHeader=req.headers.token;
    if(!authHeader)
    return res.status(401).json("You are not authenticated");

    const token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_KEY,(err,tokenBody)=> 
    {
        if(err)
        return res.status(403).json("Token is not valid!");
        
        req.tokenBody=tokenBody; //fetching the tokenbody after succesful verification of log in status
        next();
        });

}

const verifyTokenAndAuth=(req,res,next)=> //authorization
{
    verifyToken(req,res, ()=>{
        if(req.tokenBody.id===req.params.id || req.tokenBody.isAdmin)
    {
        next()
    }
    else
    {
        res.status(403).json("Not allowed!");
    }
    })
}


const verifyTokenAndAdmin=(req,res,next)=> //authorization
{
    verifyToken(req,res, ()=>{
        if( req.tokenBody.isAdmin)
    {
        next()
    }
    else
    {
        res.status(403).json("Not allowed!");
    }
    })
}
module.exports= {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin};
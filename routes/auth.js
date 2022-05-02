const router = require("express").Router();
const User = require("../models/User");
const CryptoJS=require('crypto-js')
const jwt= require('jsonwebtoken');

//REGISTER
router.post("/register",async (req,res)=>{

    const newUser = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY ).toString(),
        
    });

try{

    const SavedUser= await newUser.save();//save to database
    res.status(201).json(SavedUser);//send status code with saveduser
}
catch(err){
    res.status(500).json(err);//send status code
} 

})


//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user)
        return res.status(401).json("Wrong Credentials!");

        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
        const checkpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        if(checkpassword!==req.body.password) 
        return res.status(401).json("Wrong Credentials!");

        const accessToken = jwt.sign({ //features of jwt
            id:user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_KEY, //secret key
        {
            expiresIn:"3d" //login expire date
        }
        )

        const {password,...others} = user._doc;

        res.status(200).json({...others,accessToken});
    }
    catch(err)
    {
        res.status(500).json(err);
    }

})

module.exports=router;
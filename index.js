const express =require("express");
const app=express(); //express
const cors = require('cors');
const mongoose =require("mongoose");
const dotenv = require("dotenv"); //to protect the url containing passw
dotenv.config();
app.use(cors());

const userroute=require("./routes/users")
const authroute=require("./routes/auth")
const productsroute=require('./routes/product')
const cartroute=require('./routes/cart')
const orderroute=require('./routes/order')
const striperoute =require('./routes/stripe')


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
   }

dotenv.config();
mongoose//connecting MongoDB
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Succesful Connection"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use('/api/users',userroute);
app.use('/api/auth',authroute);
app.use('/api/products',productsroute);
app.use('/api/cart',cartroute)
app.use('/api/order',orderroute)
app.use('/api/checkout',striperoute)



 
app.listen(process.env.PORT||5000,()=>{
    console.log("Backend running");
})

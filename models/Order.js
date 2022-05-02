const mongoose=require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true},
        cart:
            {
                products:{
                    type:Array,
                    default: []
                },
                quantity:{
                    type:Number,
                    default:0
                },
                price:{
                    type:Number,
                    default:0
                }
            },

           checkoutId:{type:String, required:true} 
       
        
       
        
    },

    {timestamps: true}
);

module.exports=mongoose.model("Order",OrderSchema);
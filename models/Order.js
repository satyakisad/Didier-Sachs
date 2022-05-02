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
            }
       
        
       
        
    },

    {timestamps: true}
);

module.exports=mongoose.model("Order",OrderSchema);
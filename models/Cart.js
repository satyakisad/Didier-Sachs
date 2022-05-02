const mongoose=require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true, unique: true},
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

module.exports=mongoose.model("Cart",CartSchema);  //exporting the model and naming it Cart in Mongoose
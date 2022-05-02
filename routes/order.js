const router = require("express").Router();

const Order = require("../models/Order");

const { verifyTokenAndAuth, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");



//CREATE
router.post("/:id", verifyTokenAndAuth, async (req, res) => {
    const newOrder = new Order(req.body);
    const checkoutId= newOrder.checkoutId;
    try {
        const checkOrder = await find({checkoutId:checkoutId});
        if(checkOrder.length>=1)
        {throw {msg:"Dont fool us"};
        
         }
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
})



//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {


    try {
        
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//FIND USER ORDERS
router.get("/find/:id", async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
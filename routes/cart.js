const router = require("express").Router();

const Cart = require("../models/Cart");

const { verifyTokenAndAuth, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");



//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart= await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }
})



//UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {

    try {
        const cart = await Cart.findOne({userId: req.params.id});

        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {

    try {
        await Cart.findOneAndDelete({userId: req.params.id});
        res.status(200).json("Cart is Empty!");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//GET A USER CART
router.get("/find/:id",verifyTokenAndAuth, async (req, res) => {  
    try {
        const cart = await Cart.findOne({userId: req.params.id});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:"cart",
    initialState:{
    
        products:[],
        quantity:0,
        total: 0,
    },
    reducers:{
        initialCart:(state,action)=>{
            
            state.quantity=action.payload.cart.quantity;
            state.products= action.payload.cart.products.map(item=>item);
            state.total=action.payload.cart.price;
            

        },
        addProduct: (state,action)=>{
            state.quantity +=1;
            state.products.push(action.payload);    //payload is our new product
            state.total+=action.payload.price*action.payload.quantity;
            
            
            
        },
        clearCart: (state)=>{
            state.quantity=0;
            state.products= [];
            state.total=0;
        },
        deleteItem:(state,action)=>{
            console.log(action.payload);
            state.quantity-=1;
            const deletedItem= state.products[action.payload];
            state.total-=deletedItem.price*deletedItem.quantity;
            state.products.splice(action.payload,1);
        }
    }
})

export const {addProduct,initialCart,clearCart,deleteItem} =cartSlice.actions;
export default cartSlice.reducer;
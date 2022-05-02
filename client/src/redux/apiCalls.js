import { loginFailure, loginStart, loginSuccess } from "./userRedux";

import axios from "axios";
import{ clearCart, initialCart } from "./cartRedux";
import { logout } from '../redux/userRedux'
import { REACT_APP_URL } from "../App";




export const loginAPI = async (dispatch, user) => {                           //LOG IN API
 
  dispatch(loginStart());
  try {
    const res = await axios.post(REACT_APP_URL+"/auth/login", user);
    dispatch(loginSuccess(res.data));


    try {                    //try block for initializing cart after LOGIN
      if (res.data) {
          
          var cartExists = await axios.get(REACT_APP_URL+ "/cart/find/" + res.data._id,{headers:{token:`Bearer ${res.data.accessToken}`}});
          if(cartExists.data===null)
          {
              console.log("inside if");
              cartExists = await axios.post(REACT_APP_URL + "/cart/",{userId:res.data._id},{headers:{token:`Bearer ${res.data.accessToken}`}})
              
          }
         
          dispatch(initialCart(cartExists.data))
      }
  }
  catch(e)
  {console.log(e)};



  } catch (err) {
  dispatch(loginFailure());
  }
};




export const logoutAPI = async (dispatch) => {                   //LOG OUT API
  dispatch(logout());
  dispatch(clearCart());
}


export const signupAPI =  async(dispatch,user)=>{
  try {
    const res = await axios.post(REACT_APP_URL+"/auth/register",user);
    console.log(res.data);
    return {errormsg:false}
  }
  catch(err)
  {
  return {errormsg:true}
  }

}

export const Neworder = async(dispatch,user,cart)=>
{
  
  
  
  try{
    console.log(cart)
   
   await axios.post(REACT_APP_URL + "/order/"+user._id,{
      cart:
      {
          products: [...cart.products],
          quantity: cart.quantity,
          price: cart.total,
          checkoutId: cart.checkoutId
      },
      userId:user._id},{headers:{token:`Bearer ${user.accessToken}`}})
   

      await axios.put(REACT_APP_URL+"/cart/"+user._id,
      {cart:
       {
       products:[],
       quantity:0,
       price:0}
   },
   {headers:{token:`Bearer ${user.accessToken}`}})

   dispatch(clearCart());

   
   

   



  }
  catch(e)
  {
    console.log(e);
  }
}

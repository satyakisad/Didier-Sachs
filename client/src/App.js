import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Success } from "./Pages/Success";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { initialCart } from "./redux/cartRedux";
import ScrollToTop from "./ScrollToTop";


export const REACT_APP_URL = "https://didiersachs.herokuapp.com";

function App() {

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {  //FOR INITIALIZING THE CART FROM BACKEND AT RELOAD.
    const initializeCart = async ()=>{
        try {
            if (user) {
                
                var cartExists = await axios.get(REACT_APP_URL+ "/cart/find/" + user._id,{headers:{token:`Bearer ${user.accessToken}`}});
                if(cartExists.data===null)
                {
                    console.log("inside if");
                    cartExists = await axios.post(REACT_APP_URL + "/cart/",{userId:user._id},{headers:{token:`Bearer ${user.accessToken}`}})
                    
                }
               
                dispatch(initialCart(cartExists.data))
            }
        }
        catch(e)
        {console.log(e)};
    }
    initializeCart();
    
}, [])


  return (
    
    <BrowserRouter>
    <ScrollToTop>
      <Routes>

      <Route path="/" element={<Home/>} />
        
     
      <Route path="/products/:cat" element={<ProductList/>} />
      
      <Route path="/product/:id" element={<Product/>} />

      <Route path="/cart" element={
      user?<Cart/>:<Navigate to="/" replace/>} />

      <Route path="/success/:id" element={<Success/>} />

      <Route path="/register" element={
      user?<Navigate to="/" replace/>:<Register/>  //replace prop to prevent extra redirect if user clicks back
      } />

      <Route path="/login" element={
      user?<Navigate to="/" replace/>:<Login/>  //replace prop to prevent extra redirect if user clicks back
      } />






      </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default App;

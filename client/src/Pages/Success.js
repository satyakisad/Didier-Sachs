import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { REACT_APP_URL } from '../App'
import img from '../images/loginpage.jpg'
import { Neworder } from '../redux/apiCalls'

const Container=styled.div`
position: relative;
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-image: url(${img});
background-repeat: no-repeat;
background-position: center;

`
const Wrapper=styled.div`
width: 20%;
padding: 20px;
background-color: white;
z-index: 2;
box-shadow: 7px 7px 7px 7px;
;

`

const Design= styled.div`
position: absolute;

width: 100vw;
height: 100vh;
background-color: black;
opacity: 0.5;
z-index: 1;
`

const Title=styled.h1`

`


export const Success = () => {
  const location = useLocation();
    const id = location.pathname.split("/")[2];
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    
   
useEffect( ()=>             //useeffect used, because the cart needs to load from database, and then it will update the cartredux
{                            //, thus once the cart state is loaded from database, useeffect is triggered and order is stored.

  if(cart.quantity===0)
  return;
  const fetch=async ()=>{
    console.log(cart)
  
  console.log(cart)
  const res = await axios.get(REACT_APP_URL+'/checkout/success/'+id)
  Neworder(dispatch,user,{...cart,checkoutId:id});
  console.log(res.data);

};
fetch();
 
},[cart])

  return (
    <Container>
      <Design></Design>
    <Wrapper>
      <Title>
       SUCCESSFUL PAYMENT!
      </Title>
      
    </Wrapper>
    </Container>
  )
}

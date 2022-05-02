
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { deleteItem } from "../redux/cartRedux";
import { REACT_APP_URL } from "../App";




const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;







const Bottom = styled.div`
  display: flex;
  justify-content: space-between;


`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  
  
  border-bottom: 1px solid grey; 
  border-top: 1px solid grey;
  margin-bottom: 5px;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50%;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
`;



const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const AmountButton = styled.button`
background: none;
display: flex;
align-items: center;
border: 0;
cursor: pointer;

`

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

useEffect(()=>{  //RUNS IMMEDIATELY AFTER REDUX CART STATE IS CHANGED,SYNCS USER CART TO THE DATABASE (For deleting items)
const fetch=async ()=>{


    try{
        await axios.put(REACT_APP_URL+"/cart/"+user._id,
        {cart:
         {
         products:[...cart.products],
         quantity:cart.quantity,
         price:cart.total}
     },
     {headers:{token:`Bearer ${user.accessToken}`}})
     console.log("after axios");
 }
 catch(e)
 {
     console.log(e);
 }
}
fetch();

},[cart])



  const handleCheckout = async () => {

    const res = await axios.post(REACT_APP_URL+"/checkout/payment",
      {
        items: [...cart.products]
      },{headers:{token:`Bearer ${user.accessToken}`}})
    const paymentlink = res.data.url;
    window.location.href = paymentlink;
    console.log(paymentlink);
  }

  const deleteHandler = (index)=>{

    dispatch(deleteItem(index));
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>

        <Bottom>
          <Info>

            {cart.products.map((item,index) => (
              <Product>
          <Link to={'/product/'+item._id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <ProductDetail>
                  <Image src={item.img[0]} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                </Link>
                <PriceDetail>
                  <ProductAmountContainer>

                    <ProductAmount> {item.quantity}x</ProductAmount>
                    <AmountButton onClick={()=>deleteHandler(index)}>
                      <DeleteIcon/>
                    </AmountButton>
                  </ProductAmountContainer>
                  <ProductPrice>Rs. {item.price*item.quantity}</ProductPrice>
                </PriceDetail>

              </Product>

            ))
            }


          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total * 0.1}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -{cart.total * 0.1}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name="DIDIER SACHS"
              image="https://static.wikia.nocookie.net/gtawiki/images/4/43/DidierSachs-Logo.svg"
              billingAddress
              shippingAddress
              description={`Your total is Rs.${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            > */}
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
            {/* </StripeCheckout> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
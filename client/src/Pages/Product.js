import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Newsletter from '../Components/Newsletter'
import Announcement from '../Components/Announcement'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { Add } from '@material-ui/icons'
import Footer from '../Components/Footer'
import { Remove } from '@mui/icons-material'

import { useLocation } from 'react-router-dom'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AddComment } from '../Components/AddComment'
import DeleteIcon from '@mui/icons-material/Delete';
import { REACT_APP_URL } from '../App'
const Container = styled.div`

`
const Wrapper = styled.div`
padding: 50px;
display: flex;
background-image: linear-gradient(to top,#70a8cc,#FFFFFF);
`

const Arrow = styled.div`
width: 50px;
height: 50px;
display: flex;
align-items: center;
    position: absolute;
    top: 0;
    bottom: 0; 
    margin: auto;
    justify-content: center;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    z-index: 3;
    
`
const ImageContainer = styled.div`
flex: 1;
max-width: 650px;
min-width: 650px;
position: relative;
display: flex;
overflow: hidden;

`
const Tempdiv = styled.div`
display: flex;

transition-duration: 700ms;
transition-timing-function: ease-out;
transform: translateX(${props => props.si * (-650)}px);
`
const Slide = styled.div`
width: 100%;
margin-left: 50px;
margin-right: 50px;
min-width: 550px;

flex:1;
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;


`

const InfoContainer = styled.div`
flex: 1;
margin-left: 30px;
`

const Title = styled.h1`
font-size: 50px;
margin-top: 0;
`

const Desc = styled.p`
font-size: 20px;
`
const Price = styled.span`
font-weight:100;
font-size: 40px;
`
const FilterContainer = styled.div`
width: 50%;
margin: 20px 0;
display: flex;
justify-content: space-between;

`
const Filter = styled.div`
display: flex;
align-items: center;

`
const FilterTitle = styled.span`

font-size: 20px;
font-weight: 300;
`

const FilterColor = styled.div`
width: 25px;
height: 25px;
border-radius: 50%;
background-color: ${props => (props.color)};
border: ${props => (props.selected)};
margin: 0 5px;
cursor: pointer;
`

const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
`

const FilterSizeOption = styled.option`
`;

const AddContainer = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
margin: 50px 0;
`
const AmountContainer = styled.div`
display: flex;
align-items: center;
width: 200px;
`
const Amount = styled.div`
border: 1px solid teal;
font-weight: 700;
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 30%;
`
const AddButton = styled.button`

align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  
&:hover {
  background: #F6F9FE;
  color: #174ea6;
}

&:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

&:focus {
  outline: none;
  
}

&:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

&:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
}

&:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

&:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
}

&:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}
`

const ReviewTitle = styled.h1`
font-size: 50px;

margin-left: 70px;

`
const ReviewsContainer = styled.div`

margin: 50px;
margin-top: 10px;
padding: 20px;
z-index: 0;
`
const TitleContainer = styled.div`

font-weight: bold;
`
const CommentContainer = styled.div`
word-break: break-all;
padding-top: 5px;
`
const Review = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
border: 1px solid grey;
z-index: 1;
min-height: 60px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
padding: 10px;
margin-bottom: 10px;
`

const ReviewTop = styled.div`
display: flex;
align-items: center;
padding-right: 70px;
justify-content: space-between;
`

const CommentButton = styled.button`
background-color: initial;
  background-image: linear-gradient(-180deg, #00D775, #00BD68);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #FFFFFF;
  cursor: pointer;
  
  font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
  height: 44px;
  line-height: 44px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  
  white-space: nowrap;
  
  z-index: 9;
  border: 0;
  &:hover {
    background: #00bd68;
  }
  
  `
const CommentWrapper = styled.div`
  max-width: 700px;
  `


const AmountButton = styled.button`
background: none;
display: flex;
align-items: center;
border: 0;
cursor: pointer;

`


export default function Product() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector(state => state.cart)
    const [isCommentModal, setCommentModal] = useState(false);
    const [isFetch, setisFetch] = useState(-1);
    const [SlideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(REACT_APP_URL+"/products/find/" + id);
                setProduct(res.data);
                setColor(res.data.color[0]);
                setSize(res.data.size[0])
            } catch { }
        };
        getProduct();
    }, [id, isFetch]);





    const handleQuantity = (type) => {
        if (type === -1) {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };


    useEffect(() => {  //RUNS IMMEDIATELY AFTER REDUX CART STATE IS CHANGED

        if (!user)
            return;
        const fetch = async () => {


            try {
                await axios.put(REACT_APP_URL + "/cart/" + user._id,
                    {
                        cart:
                        {
                            products: [...cart.products],
                            quantity: cart.quantity,
                            price: cart.total
                        }
                    },
                    { headers: { token: `Bearer ${user.accessToken}` } })
                console.log("after axios");
            }
            catch (e) {
                console.log(e);
            }
        }

        fetch();
    }, [cart])




    const Comment = async (text) => {

        try {
            await axios.put(REACT_APP_URL + "/products/comment/" + user._id,
                {
                    productId: id,
                    comment: {

                        comment: text,
                        name: user.name,
                        userId: user._id,
                    }
                },

                { headers: { token: `Bearer ${user.accessToken}` } });

            setisFetch(isFetch * -1);

        } catch (e) { console.log(e) }

    }
    const handleCommentDelete = async (commentid) => {

        try {
            await axios.put(REACT_APP_URL + "/products/deletecomment/" + user._id,
                {
                    productId: id,
                    commentId: commentid
                },

                { headers: { token: `Bearer ${user.accessToken}` } });

            setisFetch(isFetch * -1);
            console.log("deletedone");

        } catch (e) { console.log(e) }
    }


    const handleAddToCart = () => {          //ADDING THE CART, REDUX STATE GETTING UPDATED

        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
        console.log("before axios");


    };


    function SlideHandler(direction) {
        console.log(SlideIndex);
        if (direction === "left")
            setSlideIndex(SlideIndex > product.img.length-1? SlideIndex - 1 : product.img.length-1)
        else
            setSlideIndex(SlideIndex < product.img.length-1? SlideIndex + 1 : 0)
    }

    return (

        <Container>
            <Navbar />
            <Announcement />


            <Wrapper>
                
                <ImageContainer  >
                    <Arrow direction="left" onClick={()=>SlideHandler("left")}>
                        <ArrowBackIosOutlined fontSize='large' style={{ color: 'grey' }} />
                    </Arrow>
                    <Tempdiv si={SlideIndex}>

                        {product.img?.map((item) => (<Slide>
                            <Image src={item} />
                        </Slide>))

                        }

                    </Tempdiv>
                    <Arrow direction="right" onClick={()=>SlideHandler("right")}>
                        <ArrowForwardIosOutlined fontSize='large' color='secondary' />
                    </Arrow>
                </ImageContainer>
                <InfoContainer>
                    <Title>
                        {product.title}
                    </Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>
                        Rs. {product.price}
                    </Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} selected={color === c ? "2px solid black" : ""} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    { user&& <AddContainer>

                        <AmountContainer>
                            <AmountButton onClick={() => handleQuantity(-1)}  >
                                <Remove />
                            </AmountButton>

                            <Amount>
                                {quantity}
                            </Amount>
                            <AmountButton onClick={() => handleQuantity(1)}>
                                <Add />
                            </AmountButton>

                        </AmountContainer>
                         <AddButton onClick={handleAddToCart}>
                            ADD TO CART
                        </AddButton>
                    </AddContainer>}

                </InfoContainer>
            </Wrapper>
            <ReviewTop>
                <ReviewTitle>
                    Reviews
                </ReviewTitle>

                {user && <CommentButton onClick={() => setCommentModal(true)} >
                    ADD COMMENT
                </CommentButton>
                }
            </ReviewTop>
            <ReviewsContainer>
                {product.comments?.map((item) => {
                    return (<Review>
                        <CommentWrapper>
                            <TitleContainer>
                                {item.name}
                            </TitleContainer>
                            <CommentContainer>
                                {item.comment}
                            </CommentContainer>
                        </CommentWrapper>
                        {item.userId === user?._id && <AmountButton onClick={() => handleCommentDelete(item._id)}>
                            <DeleteIcon />
                        </AmountButton>}
                    </Review>)
                })}

            </ReviewsContainer>

            <Newsletter />
            <Footer />
            {isCommentModal && <AddComment setclose={setCommentModal} comment={Comment} />}
        </Container>


    )
}

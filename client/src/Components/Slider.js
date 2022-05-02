import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { sliderItems } from '../data';


const Container = styled.div`

width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden;
`
const Wrapper = styled.div`
height:100%;
display: flex;
transition-duration: 700ms;
transition-timing-function: ease-out;
transform: translateX(${props=>props.si*(-100)}vw);

`

const Slide = styled.div`
display: flex;
width: 100vw;
height: 100vh;
align-items: center;
background-image: ${props => props.bg};
`

const ImgContainer = styled.div`
height: 100%;
flex:1;
display: flex;
justify-content: center;
`
const InfoContainer = styled.div`
flex:1;
`
const Title = styled.h1`
font-size: 70px;

`
const Desc = styled.p`
margin: 50px 0;
font-weight: bold;
letter-spacing: 3px;
word-wrap: break-word;
`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
box-shadow: 3px 3px;
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



export default function Slider() {
  const [SlideIndex,setSlideIndex] = useState(0);

  function SlideHandler(direction)
  {
    if(direction==="left")
    setSlideIndex(SlideIndex>0?SlideIndex-1:2)
    else
    setSlideIndex(SlideIndex<2?SlideIndex+1:0)
  }
  return (
    
    <Container>
      <Arrow direction="left" onClick={()=>SlideHandler("left")}>
        <ArrowBackIosOutlined fontSize='large' style={{ color: 'grey' }} />
      </Arrow>
      <Wrapper si={SlideIndex}>
        {sliderItems.map((i) => (


          <Slide bg={i.bg}>
            <ImgContainer>

              <img src={i.img} alt='' className='slider-img' />
            </ImgContainer>

            <InfoContainer>
              
           
              <Title>{i.title}</Title>
              <Desc>{i.desc}</Desc>
              <Link to={`/products/${i.keyword}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <Button>EXPLORE</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>SlideHandler("right")}>
        <ArrowForwardIosOutlined fontSize='large' color='secondary' />
      </Arrow>
    </Container>
  )
}

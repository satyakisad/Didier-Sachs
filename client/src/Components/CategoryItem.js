import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`

flex:1;
margin: 5px;
margin-bottom: 20px;
height: 70vh;
min-width: 400px;

position: relative;
transition-duration:500ms;
&:hover{
    transform: scale(1.1);
  z-index: 1;
   
}

`


const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
object-position: 20% 10%;
`

const InfoContainer = styled.div`
height: 100%;
width: 100%;
position: absolute;
text-align: center;
top:0;
left: 0;
display: flex;
flex-direction: column;
justify-content: center;
cursor: pointer;
`
const Title = styled.h1`
background-color: white;
border-left: 1px solid lightgrey;
border-right: 1px solid lightgrey;
text-decoration: none;
`

// const Button = styled.button`
// font-size:20px;
// background: none;
// background-color: white;
// cursor:  pointer;
// border: none;
// border-left: 1px solid lightgrey;
// border-right: 1px solid lightgrey;
// `




export default function CategoryItem(props) {
    return (
        
        <Container>
            <Link to={`/products/${props.item.cat}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Image src={props.item.img} />
            

            <InfoContainer>
                <Title>{props.item.title}</Title>

                {/* <Button>SHOP NOW</Button> */}
            </InfoContainer>
            </Link>
            
        </Container>
    )
}

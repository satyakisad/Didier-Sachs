import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components'

const Container=styled.div`
background-color: #fcf5f5;
height: 70vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title=styled.h1`
font-size: 70px;
margin-bottom: 10px;
`
const Desc=styled.p`
font-size: 25px;
font-weight: 400;
margin-bottom: 30px;
text-align: center;
margin-top: 10px;
`
const InputContainer=styled.div`
width: 40%;
background-color: blue;
display: flex;
height: 35px;
`
const Input=styled.input`
flex: 8;
padding-left: 10px;
`
const Button=styled.button`
flex:1;
display: flex;
align-items: center;
justify-content: center;
border:none;
cursor:pointer;
background-color: #93CCEA;
`

export default function Newsletter() {
  return (
    <Container>
        <Title>
            Newsletter
        </Title>
        <Desc>
        Want to be the first one to know about sales? <br/> Subscribe to our newsletter!
        </Desc>
        
        <InputContainer>
        <Input placeholder='Enter Email' />
        <Button>
            <SendIcon/>
        </Button>
        </InputContainer>
    </Container>
  )
}


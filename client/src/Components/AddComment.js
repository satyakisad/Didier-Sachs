import React, { useState } from 'react'
import styled from 'styled-components'

const Container=styled.div`
position: fixed;
left: 0;
top: 0;
width: 100vw;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

background-repeat: no-repeat;
background-position: center;
z-index: 2;

`

const Wrapper=styled.div`
width: 20%;
padding: 20px;
background-color: white;
z-index: 10;
box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
;

`

const Design= styled.div`
position: absolute;
width: 100vw;
height: 100vh;
background-color: black;
opacity: 0.5;
z-index: 2;
`

const Title=styled.h1`
margin-bottom: 5px;
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
  const Input=styled.textarea`
  width: 90%;
 
  height: 200px;
 margin: 20px 0;
  padding:10px;
  resize: none;
  `

export const AddComment = (props) => {
    const [text, setText] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
       
        if(text.trim().length===0)
        return;

        props.setclose(false);
        props.comment(text);


    
       
    }
    

    return (
        <Container >
            <Design onClick={()=>props.setclose(false)}></Design>
            <Wrapper>

                <Title>
                     PRODUCT REVIEW
                </Title>
                <Input name="text" type="message" placeholder='Comment here...' onChange={(e) => setText(e.target.value)}/>
                <CommentButton onClick={handleClick}>
                    ADD COMMENT
                </CommentButton>
            </Wrapper>
        </Container>

    )
}


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import img from '../images/loginpage.jpg'
import { loginAPI } from '../redux/apiCalls'



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
const Form=styled.form`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`
const Title=styled.h1`

`
const Input=styled.input`
flex: 1;
min-width: 40% ;
margin: 20px 10px 20px 10px;
padding:10px;
`
const Button=styled.button`
background: none;
color: white;
font-weight: 700;
font-size: 25px;
background-color: #89abe3ff;
margin: 20px 10px 20px 10px;
height: 50px;
width: 50%;
cursor: pointer;
&:disabled {
    color: green;
    cursor: not-allowed;
}
`;

const Error = styled.span`
  color: red;
`;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    




    const handleClick = async (e) => {
        e.preventDefault();
        loginAPI(dispatch, { username, password });
    
       
    }
    
    

    
       
  return (
    <Container>
        
        <Design></Design>
        <Wrapper>
            <Title>
                SIGN IN
            </Title>
                <Form>
                  
                    <Input placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    <Input placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                   
                    <Button onClick={handleClick} disabled={isFetching}>
                        LOGIN
                    </Button>
                    {error && <Error>Something went wrong...</Error>}
                </Form>
            
        </Wrapper>
    </Container>
  )
}

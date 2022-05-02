
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import img from '../images/loginpage.jpg'
import { signupAPI } from '../redux/apiCalls'
import { useNavigate } from "react-router-dom";

const Container=styled.div`
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
width: 40%;
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
`
const Error = styled.span`
  color: red;
`;


export default function Register() {
    
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const[error,setError]=useState("");
    const[isFetching,setIsFetching]=useState(false)
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        setIsFetching(true);
        e.preventDefault();
        if(password!==confirmPassword)
        {
            setError("Passwords do no match!");
            setIsFetching(false);
            return;
        }


       const res= signupAPI(dispatch, {username,password,email,name });
       if(res.errormsg===true)
       setError("Something went Wrong");
       else
       navigate('/')
        setIsFetching(false);
       
    }

  return (
    <Container>
         <Design></Design>
        <Wrapper>
            <Title>
                CREATE AN ACCOUNT
            </Title>
                <Form>
                    <Input placeholder="Name"
                    onChange={(e) => setName(e.target.value)}/>
                    
                    <Input placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                    {error!=="" && <Error>`{error}`</Error>}
                    <Button onClick={handleClick} disabled={isFetching}>
                        SIGN UP
                    </Button>
                </Form>
            
        </Wrapper>
    </Container>
  )
}

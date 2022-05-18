import { Search } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutAPI } from '../redux/apiCalls';

const Container = styled.div`
height:60px;

`;

const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
`;


const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;


const Center = styled.div`
flex: 1;
text-align: center;
display: flex;
justify-content: center;
`;
const Logo = styled.h1`
font-weight: bold;
margin: 0;
color: ${props => props.color};
`;

const Right = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
align-items: center;
`;
const Language = styled.span`
 font-size: 14;
 cursor: pointer;
 font-weight: bold;
`;

const SearchContainer = styled.div`
border: 0.5px solid lightgrey;
display: flex;

margin-left: 20px;
`;

const Input = styled.input`
border: none;

`;

const MenuItem = styled.div`
font-size: 14;
margin-left: 30px;
font-weight: bold;

cursor: pointer;
`


export default function Navbar() {
    const [search,setSearch] = useState();
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

   

    const handleLogout = () => {
        logoutAPI(dispatch)
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                        <Link to={`/products/${search}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Search />
                        </Link>

                    </SearchContainer>
                </Left>
                <Link to={'/'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Center>
                        <Logo>DIDIER.</Logo>
                        <Logo color='red'>SACHS</Logo>
                    </Center>
                </Link>
                {user === null ?
                    <Right>
                        <Link to={'/register'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link to={'/login'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <MenuItem>LOGIN</MenuItem>
                        </Link>


                    </Right>
                    :
                    <Right>

                        <MenuItem>Welcome, {user.name.split(" ")[0]}!</MenuItem>
                        <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                        <Link to={'/cart'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <MenuItem>
                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlinedIcon color="action" />
                                </Badge>

                            </MenuItem>
                        </Link>



                    </Right>
                }




            </Wrapper>

        </Container>
    )
}

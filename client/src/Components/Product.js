import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


//THIS COMPONENT IS THE PRODUCT THUMBNAIL THING

const InfoContainer = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;
  max-width: 300px;
  &:hover ${InfoContainer}{
    opacity: 1;
  }
`;



const Image = styled.img`
  width: 100%;
  
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default function Product({item}) {
  return (

    <Container>

      <Image src={item.img[0]} />
      <InfoContainer>
      <Link to={`/product/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        </Link>
        
       
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </InfoContainer>
    </Container>
  )
}

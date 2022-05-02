import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
 
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  background-color: lightgray;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const TotalLogo=styled.div`
display: flex;
`
const Logo = styled.h1`
font-weight: bold;
margin: 0;
color: ${props=>props.color};
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
 
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
 
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
      <TotalLogo>
      <Logo>DIDIER.</Logo>
      <Logo color='red'>SACHS</Logo>
      </TotalLogo>
      
        <Desc>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis cumque, eius eveniet maiores ipsam, voluptates vitae totam praesentium quisquam a commodi possimus tempore quae in illum consectetur numquam ea maxime nulla deleniti aliquid. Nostrum et hic quasi, harum fuga necessitatibus!
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
        
          <ListItem><Link to={`/`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link></ListItem>
          
         
          <ListItem> <Link to={`/cart`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Cart</Link></ListItem>
          
         
          <ListItem onClick={()=>{window.location.href="https://github.com/satyakisad"}}>My Github </ListItem>
         
          
          <ListItem onClick={()=>{window.location.href="https://gta.fandom.com/wiki/Didier_Sachs"}}> Didier Sachs origin</ListItem>
          
          
          
         
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> 69 MG Road, Kol-700009
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +91 987654321
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> satyakirx@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
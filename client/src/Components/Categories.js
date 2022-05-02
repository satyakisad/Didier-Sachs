import React from 'react'
import {categories} from '../data'
import CategoryItem from './CategoryItem'
import styled from 'styled-components'

const Container=styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
flex-wrap: wrap;
background-image: linear-gradient(to top,#d7dead,#d7dead,#FFFFFF);
padding-bottom: 50px;

`
const Title = styled.h1`
font-size: 50px;
text-align: center;
`
export default function Categories() {
    return (<>
        <Title>CATEGORIES</Title>
        <Container>
            
            {categories.map((i)=>(
                <CategoryItem item={i} />
            ))}


        </Container>
       
        </>
    )
}

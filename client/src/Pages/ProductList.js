import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'

const Container = styled.div`

`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`
const Filter= styled.div`
margin: 20px;
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
 
`;
const Option = styled.option``;

const Title= styled.h1`
margin-left: 20px;
`

export default function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2]; //Extracting the category from URL
  console.log(cat)
  const [filter,setFilter]=useState({}); //Filter will contain Color and Size only.
  const [sort,setSort]=useState("new"); //Sort will contain either new, asc or desc

  const handleFilters=(e)=>{
    const value=e.target.value;
    setFilter({
      ...filter,
      [e.target.name]:value   //updating filters
    })
  }
  console.log(filter);
    return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Title>
            {cat.toUpperCase()}
        </Title>
        <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters} >
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="new">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
        <Products cat={cat} filters={filter} sort={sort}/>
        <Footer/>
    </Container>

  )
}
 
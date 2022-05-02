import React, { useEffect, useState } from 'react'
import Product from './Product'

import styled from 'styled-components'
import axios from 'axios'
import { REACT_APP_URL } from '../App'

//THIS COMPONENT IS THE COMPILATION OF PRODUCT COMPONENT

const Container = styled.div`
padding: 20px;
display: flex;
    flex-wrap: wrap;
    
    background-image: linear-gradient(to bottom,#d7dead,#FFFFFF);
`
const Title = styled.h1`
font-size: 50px;
text-align: center;
`
export default function Products({ cat, filters, sort }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `${REACT_APP_URL}/products?category=${cat}`
            : REACT_APP_URL+"/products");
        
        setProducts(res.data)                    //Displaying only First 8 products at HOME PAGE.

      } catch (err) { }
    }
    getProducts();

  }, [cat])

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) =>
       item[key].includes(value)
        ))
      );
    }
  },[products,cat,filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (<>
    {!cat&&<Title>POPULAR PRODUCTS</Title>}
    <Container>
      {cat ? filteredProducts.map((i) => (
        <Product item={i} key={i.id} />
      ))
      :   products.splice(0,8).map((i) => (
        <Product item={i} key={i.id} />
      ))
      }
    </Container>
    </>
  )
}

import React from "react";
import styled from "styled-components";
import { IProduct } from "../../modals/IProduct";

type ProductListProps = {
  columns: number;
  gap: string;
};

const ProductList = styled.div<ProductListProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, [linename1] 220px);
  gap: ${(props) => props.gap};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

type ProductProps = IProduct;

const Product = styled.div<ProductProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 0.5rem;
  padding: 1.5rem;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
  }
`;

type ProductsProps = {
  products: IProduct[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <ProductList columns={3} gap="1rem">
      {products.map((product, index) => (
        <Product key={index + product.productName} {...product}>
          {product?.image && (
            <img src={product.image} alt={product.productName} />
          )}
          <h2>{product.productName}</h2>
          <p>Category : {product.categoryName}</p>
          <p>Brand: {product.brandName}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}/5</p>
          <p>Discount: {product.discount}% off</p>
        </Product>
      ))}
    </ProductList>
  );
};

export default Products;

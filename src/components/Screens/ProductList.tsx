import React, { useState, useEffect } from "react";
import "./Styles.css";
import { useSelector, useDispatch } from "react-redux";
import AddTab from "../Modal";
import { IProduct } from "../../modals/IProduct";
import Filter from "../Tab/Filter";
import styled from "styled-components";
import Products from "../Custom/Products";
import { ITab } from "../../modals/ITab";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #222;
  color: #fff;
  display: flex;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftDrawer = styled.nav<{ open: boolean }>`
  background-color: #333;
  color: #fff;
  width: ${({ open }) => (open ? "250px" : "0px")};
  transition: width 0.3s ease-in-out;
`;

const RightPanel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: #ededed;
`;

const MenuIcon = styled.span`
  cursor: pointer;
`;

interface TabHeaderProps {
  isActive: boolean;
}

const TabHeader = styled.div<TabHeaderProps>`
  padding: 12px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.isActive ? "2px solid black" : "2px solid transparent"};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;
interface TabWiseProductProps {
  tab: ITab;
}

const ProductList = () => {
  const tab = useSelector((state: RootState) => state.tabs).Tab;
  console.log("ProductList Tab", tab);
  const products = useSelector((state: RootState) => state.products).Products;
  const [productList, setProductList] = useState<IProduct[]>(products);
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(tab.serach);
  const [categoryFilter, setCategoryFilter] = useState<string>(tab.category);
  const [brandFilter, setBrandFilter] = useState<string>(tab.brand);
  const [minPrice, setMinPrice] = useState<number>(tab.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(tab.maxPrice);
  const [minDiscount, setMinDiscount] = useState<number>(tab.minDiscount);
  const [maxDiscount, setMaxDiscount] = useState<number>(tab.maxDiscount);

  useEffect(() => {
    setValues();
  }, [products, tab]);

  const setValues = () => {
    setSearchTerm(tab.serach);
    setCategoryFilter(tab.category);
    setBrandFilter(tab.brand);
    setMinPrice(tab.minPrice);
    setMaxPrice(tab.maxPrice);
    setMinDiscount(tab.minDiscount);
    setMaxDiscount(tab.maxDiscount);
  };

  // const filterProducts = () => {
  //   console.log("ProductList", "filterProducts" + searchTerm);
  //   const filteredProducts = products.filter((product: IProduct) => {
  //     // filter by search term
  //     const searchTermMatch =
  //       searchTerm === "" ||
  //       product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.brandName.toLowerCase().includes(searchTerm.toLowerCase());
  //     // filter by category
  //     const categoryFilterMatch =
  //       categoryFilter === "" || product.categoryName === categoryFilter;
  //     // filter by brand
  //     const brandFilterMatch =
  //       brandFilter === "" || product.brandName === brandFilter;
  //     // filter by price
  //     const priceFilterMatch =
  //       product.price >= minPrice && product.price <= maxPrice;
  //     // filter by discount
  //     const discountFilterMatch =
  //       product.discount >= minDiscount && product.discount <= maxDiscount;

  //     return (
  //       searchTermMatch &&
  //       categoryFilterMatch &&
  //       brandFilterMatch &&
  //       priceFilterMatch &&
  //       discountFilterMatch
  //     );
  //   });
  //   console.log(filteredProducts.length);
  //   setProductList(filteredProducts);
  // };

  const filteredProducts = products.filter((product: IProduct) => {
    // filter by search term
    const searchTermMatch =
      searchTerm === "" ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    // filter by category
    const categoryFilterMatch =
      categoryFilter === "" || product.categoryName === categoryFilter;
    // filter by brand
    const brandFilterMatch =
      brandFilter === "" || product.brandName === brandFilter;
    // filter by price
    const priceFilterMatch =
      product.price >= minPrice && product.price <= maxPrice;
    // filter by discount
    const discountFilterMatch =
      product.discount >= minDiscount && product.discount <= maxDiscount;

    return (
      searchTermMatch &&
      categoryFilterMatch &&
      brandFilterMatch &&
      priceFilterMatch &&
      discountFilterMatch
    );
  });

  return (
    <>
      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <h3>No Data Found</h3>
      )}
    </>
  );
};
export default ProductList;

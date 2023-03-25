import React, { useState, useEffect } from "react";
import "./Styles.css";
import { useSelector, useDispatch } from "react-redux";
import AddTab from "../Modal";
import jsonData from "../../database/data.json";
import { IProduct } from "../../modals/IProduct";
import productsAction from "../../Actions/productsAction";
import styled from "styled-components";
import { ITab } from "../../modals/ITab";
import TabWiseProduct from "./TabWiseProduct";
import { Product } from "../../modals/Product";
import tabAction from "../../Actions/tabAction";

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

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  position: absolute;
  right: 5px;
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

const Home = () => {
  const [showAddTab, setShowAddTab] = useState(false);
  const tabs = useSelector((state: RootState) => state.tabs).Tabs;
  const selectedTab = useSelector((state: RootState) => state.tabs).Tab;
  const [open, setOpen] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadData() {
      let products: IProduct[] = [];
      for (const [categoryName, category] of Object.entries(
        jsonData.categories
      )) {
        for (const [brandName, brand] of Object.entries(category.brands)) {
          for (const [productName, product] of Object.entries(brand)) {
            let tmp: Product = product as Product;
            let tmpProduct: IProduct = {
              productName: productName,
              categoryName: categoryName,
              brandName: brandName,
              image: tmp.image,
              price: tmp.price,
              discount: tmp.discount,
              rating: tmp.rating,
            };
            products.push(tmpProduct);
          }
        }
      }
      dispatch(productsAction.loadProducts(products));
      await loadCategoryAndBrand(products);
      // setProductList(products);
    }
    loadData();
  }, []);

  const loadCategoryAndBrand = async (products: IProduct[]) => {
    var catList: string[] = [];
    products.filter(function (item: IProduct) {
      var i = catList.findIndex((x) => x == item.categoryName);
      if (i <= -1) {
        catList.push(item.categoryName);
      }
      return null;
    });
    var brandList: string[] = [];
    products.filter(function (item: IProduct) {
      var i = brandList.findIndex((x) => x == item.brandName);
      if (i <= -1) {
        brandList.push(item.brandName);
      }
      return null;
    });
    dispatch(productsAction.loadCategories(catList));
    dispatch(productsAction.loadBrands(brandList));
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const addCategory = () => {
    setShowAddTab(true);
  };

  const onClose = () => {
    setShowAddTab(!showAddTab);
  };
  const handleTabClick = (index: number, tab: ITab) => {
    dispatch(tabAction.changeTab(tab));
    setActiveTabIndex(index);
  };

  return (
    <Container>
      <Header>
        {tabs.map((tab: ITab, index: number) => (
          <TabHeader
            key={index}
            isActive={selectedTab.id === tab.id}
            onClick={() => handleTabClick(index, tab)}
          >
            {tab.name}
          </TabHeader>
        ))}
        <Button type="button" onClick={addCategory}>
          Add Tab
        </Button>
      </Header>
      <Main>
        <TabWiseProduct />
      </Main>
      {showAddTab && <AddTab onClose={onClose} />}
    </Container>
  );
};
export default Home;

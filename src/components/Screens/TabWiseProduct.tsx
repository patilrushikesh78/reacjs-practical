import React, { useState, useEffect } from "react";
import "./Styles.css";
import { useSelector, useDispatch } from "react-redux";
import AddTab from "../Modal";
import { IProduct } from "../../modals/IProduct";
import Filter from "../Tab/Filter";
import styled from "styled-components";
import Products from "../Custom/Products";
import { ITab } from "../../modals/ITab";
import ProductList from "./ProductList";

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

const TabWiseProduct = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <LeftDrawer open={open}>
        <Filter />
      </LeftDrawer>
      <RightPanel>
        <ProductList />
      </RightPanel>
    </>
  );
};
export default TabWiseProduct;

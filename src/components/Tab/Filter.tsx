import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IProduct } from "../../modals/IProduct";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import styled from "styled-components";
import SelectDropdown from "../Custom/SelectDropdown";
import { ITab } from "../../modals/ITab";
import tabAction from "../../Actions/tabAction";
import RangeInput from "../Custom/RangeInput";
// import MultiRangeSlider from "multi-range-slider-react";

const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
`;

const ChildDiv = styled.div`
  width: 100%;
  margin: 10px;
  // padding: 10px;
`;

const ChildDivRow = styled.div`
  width: 100%;
  padding: 10px 20px 20px 20px;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

type FilterProps = {
  onApply: Function;
};

const Filter = () => {
  const tabs = useSelector((state: RootState) => state.tabs).Tabs;
  const tab = useSelector((state: RootState) => state.tabs).Tab;
  const categoryList = useSelector(
    (state: RootState) => state.products
  ).Categories;
  const brandList = useSelector((state: RootState) => state.products).Brands;
  const [searchTerm, setSearchTerm] = useState<string>(tab.serach);
  const [categoryFilter, setCategoryFilter] = useState<string>(tab.category);
  const [brandFilter, setBrandFilter] = useState<string>(tab.brand);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [minDiscount, setMinDiscount] = useState<number>(tab.minDiscount);
  const [maxDiscount, setMaxDiscount] = useState<number>(tab.maxDiscount);
  const dispatch = useDispatch();

  useEffect(() => {
    setValues();
  }, [tab]);

  const handleReset = () => {
    let tmpTab: ITab = {
      id: tab.id,
      name: tab.name,
      serach: "",
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 200,
      minDiscount: 0,
      maxDiscount: 100,
    };

    setCategoryFilter(tmpTab.category);
    setBrandFilter(tmpTab.brand);
    setSearchTerm(tmpTab.serach);
    setMinPrice(tmpTab.minPrice);
    setMaxPrice(tmpTab.maxPrice);
    // setMinPriceDefault(0);
    // setMaxPriceDefault(200);
    setMinDiscount(tmpTab.minDiscount);
    setMaxDiscount(tmpTab.maxDiscount);
    updateFilter(tmpTab, true);
  };

  const setValues = () => {
    setSearchTerm(tab.serach);
    setCategoryFilter(tab.category);
    setBrandFilter(tab.brand);
    setMinPrice(tab.minPrice);
    setMaxPrice(tab.maxPrice);
    setMinDiscount(tab.minDiscount);
    setMaxDiscount(tab.maxDiscount);
  };

  const updateFilter = (tab: ITab, isReset = false) => {
    let tmpTab: ITab = {
      id: tab.id,
      name: tab.name,
      serach: searchTerm,
      category: categoryFilter,
      brand: brandFilter,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: minDiscount,
      maxDiscount: maxDiscount,
    };
    if (isReset) {
      tmpTab = {
        id: tab.id,
        name: tab.name,
        serach: tab.serach,
        category: tab.category,
        brand: tab.brand,
        minPrice: tab.minPrice,
        maxPrice: tab.maxPrice,
        minDiscount: tab.minDiscount,
        maxDiscount: tab.maxDiscount,
      };
    }
    var tempTabs: ITab[] = tabs;
    var index = tabs.findIndex((x: ITab) => x.id === tmpTab.id);
    tempTabs[index] = tmpTab;
    dispatch(tabAction.addTab(tempTabs));
    dispatch(tabAction.changeTab(tmpTab));
  };

  const onOptionCategoryHandler = (value: string) => {
    console.log("User Selected Value - ", value);
    setCategoryFilter(value);
  };

  const onOptionBrandHandler = (value: string) => {
    console.log("User Selected Value - ", value);
    setBrandFilter(value);
  };

  return (
    <ParentDiv>
      <ChildDiv>
        <Input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ChildDiv>
      <ChildDiv>
        <SelectDropdown
          value={categoryFilter}
          title="Please Category"
          options={categoryList}
          onSelect={onOptionCategoryHandler}
        />
      </ChildDiv>
      <ChildDiv>
        <SelectDropdown
          value={brandFilter}
          title="Please Brand"
          options={brandList}
          onSelect={onOptionBrandHandler}
        />
      </ChildDiv>
      <ChildDiv>
        <label>Price:</label>
        <RangeInput
          title="Price"
          max={200}
          min={0}
          maxValue={maxPrice}
          minValue={minPrice}
          onChange={(min: number, max: number) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
        {/* <MultiRangeSlider
          min={0}
          max={200}
          onChange={({ min, max }) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        /> */}
      </ChildDiv>
      <ChildDiv>
        <label>Discount:</label>
        <RangeInput
          title="Discount"
          max={100}
          min={0}
          maxValue={maxDiscount}
          minValue={minDiscount}
          onChange={(min: number, max: number) => {
            setMinDiscount(min);
            setMaxDiscount(max);
          }}
        />
        {/* <MultiRangeSlider
          min={0}
          max={100}
          onChange={({ min, max }) => {
            // console.log("Discount => Min : " + min + " Max : " + max);
            setMinDiscount(min);
            setMaxDiscount(max);
          }}
        /> */}
      </ChildDiv>
      <ChildDiv></ChildDiv>
      <ChildDivRow>
        <Button type="button" onClick={() => updateFilter(tab)}>
          Apply
        </Button>
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </ChildDivRow>
    </ParentDiv>
  );
};

export default Filter;

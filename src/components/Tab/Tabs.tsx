import React, { useState } from "react";
import styled from "styled-components";
import { ITab } from "../../modals/ITab";

interface TabsProps {
  tabs: ITab[];
  onTabChange: Function;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tab, setTab] = useState<ITab>(tabs[0]);

  const handleTabClick = (index: number, tab: ITab) => {
    setActiveTabIndex(index);
    setTab(tab);
    onTabChange(index, tab);
  };

  return (
    <TabsContainer>
      <Header>
        {tabs.map((tab, index) => (
          <TabHeader
            key={index}
            isActive={activeTabIndex === index}
            onClick={() => handleTabClick(index, tab)}
          >
            {tab.name}
          </TabHeader>
        ))}
      </Header>
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
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

const Content = styled.div`
  width: 100%;
`;

export default Tabs;

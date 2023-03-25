import { ITab } from "../modals/ITab";
import actionType from "./actionType";
export const changeTab = (category: ITab) => {
  return {
    type: actionType.TAB_CHANGE,
    payload: category,
  };
};

export const addTab = (categorys: ITab[]) => {
  return {
    type: actionType.TAB_ADD,
    payload: categorys,
  };
};

export const deleteTabs = (tabs: ITab[], tab: ITab) => {
  return {
    type: actionType.TAB_DELETE,
    payload: { tabs, tab },
  };
};

export default {
  changeTab,
  addTab,
  deleteTabs,
};

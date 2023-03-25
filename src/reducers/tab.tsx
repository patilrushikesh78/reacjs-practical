import actionType from "../Actions/actionType";
import { ITabState } from "../modals/ITabState";

const initialState = {
  Tabs: [
    {
      id: 1,
      name: "Tab 1",
      serach: "",
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 200,
      minDiscount: 0,
      maxDiscount: 100,
    },
  ],
  Tab: {
    id: 1,
    name: "Tab 1",
    serach: "",
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 200,
    minDiscount: 0,
    maxDiscount: 100,
  },
  Brands: [
    { id: 1, cat_id: 2, name: "Sony" },
    { id: 2, cat_id: 2, name: "ONIDA" },
    { id: 3, cat_id: 2, name: "Videocon" },
    { id: 4, cat_id: 2, name: "LG" },
  ],
};

type Action = {
  type: string;
  payload: any;
};

export default (state: ITabState = initialState, action: Action) => {
  switch (action.type) {
    case actionType.TAB_CHANGE:
      return { ...state, Tab: action.payload };
    case actionType.TAB_ADD:
      return { ...state, Categories: action.payload };
    case actionType.TAB_DELETE:
      return { ...state, Tabs: action.payload.tabs, Tab: action.payload.tab };
    default:
      return state;
  }
};

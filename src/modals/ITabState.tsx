import { IBrand } from "./IBrand";
import { ITab } from "./ITab";

export interface ITabState {
  Tabs: ITab[];
  Tab: ITab;
  Brands: IBrand[];
}

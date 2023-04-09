export interface ReceivedCategoryModel {
  id?: any;
  name?: string;
  parent?: ReceivedCategoryModel;
  children?: ReceivedCategoryModel[];
}

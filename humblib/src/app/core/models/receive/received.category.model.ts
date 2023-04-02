export interface ReceivedCategoryModel {
  id?: number;
  name?: string;
  parent?: ReceivedCategoryModel;
  children?: ReceivedCategoryModel[];
}

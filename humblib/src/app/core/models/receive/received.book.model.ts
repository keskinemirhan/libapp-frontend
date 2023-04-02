import { ReceivedCategoryModel } from './received.category.model';

export interface ReceivedBookModel {
  bookId: number;
  name: string;
  categories?: ReceivedCategoryModel;
}

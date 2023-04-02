import { ReceivedBookModel } from './received.book.model';

export interface ReceivedLibraryModel {
  id: number;
  name: string;
  books: ReceivedBookModel[];
}

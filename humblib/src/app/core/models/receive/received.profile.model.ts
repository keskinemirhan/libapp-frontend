import { ReceivedLibraryModel } from './received.library.model';

export interface ReceivedProfileModel {
  id: number;
  username: string;
  password: string;
  email: string;
  library: ReceivedLibraryModel;
}

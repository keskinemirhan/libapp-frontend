export const BASE_URL: string =
  process.env['API_URL'] || 'http://localhost:3000';
export const BOOK_URL: string = BASE_URL + '/library/book';
export const CAT_URL: string = BASE_URL + '/library/category';
export const LIB_URL: string = BASE_URL + '/library';
export const USER_URL: string = BASE_URL + '/users';
export const PROF_URL: string = BASE_URL + '/users/profile';
export const LOG_URL: string = BASE_URL + '/users/login';
export const NOTES_URL: string = BASE_URL + '/library/notes';
export const CAT_FLAT_URL: string = CAT_URL + '/flat';

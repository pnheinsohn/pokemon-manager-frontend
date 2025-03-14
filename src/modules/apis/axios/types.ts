export interface IPaginatedResponse<T> {
  items: T[];
  count: number;
  page: number;
  total_pages: number;
}

export interface ICreateResponse {
  success: boolean;
  error: string;
}

export interface IDeleteResponse {
  success: boolean;
  error: string;
}

export interface IPaginatedSearchParams {
  limit: number;
  offset: number;
}

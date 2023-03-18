export interface List {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

export interface Pagination {
  previousPage: number | null;
  current: number;
  nextPage: number | null;
  total: number;
  pageSize: number;
}

export interface UserData {
  pagination: Pagination;
  list: List[];
}

type Address = {
  zipCode: string;
  city: string;
  streetAddress: string;
  country: string;
  state: string;
};

type Company = {
  name: string;
  suffix: string;
};

export interface SingleUser {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  company: Company;
  address: Address;
}

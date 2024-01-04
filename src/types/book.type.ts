export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  author: string;
}

export interface FormBook {
  title: string;
  description: string;
  price: number;
  author: string;
}

export interface DeleteBook {
  id : number;
}

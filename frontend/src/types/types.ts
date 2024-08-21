export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  inStock: boolean;
  brand: string;
  category: string;
  sku: string;
  quantity: number;
  type: string;
  rating: string;
  reviews_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  products: Product[];
  totalProducts: number;
  page: number;
  pageSize: number;
}

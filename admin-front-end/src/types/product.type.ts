export type ProductType = {
  id: number;
  categoryId: number;
  price: number;
  quantity: number;
  image: string;
  star: number;
  quantityVote: number;
  name: string;
};

export type ProductDetailType = {
  id: number;
  productId: number;
  description?: string;
  brandId: number;
  code?: number;
};

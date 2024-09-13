export type Product = {
    id: number;
    userId: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    productCategory?: string;
    description?: string;
    avgRating?: number;
    availability?: 'inStock' | 'outOfStock';
    discount?: number;
}

// export type ProductCategory = {
//     id: string;
//     name: string;
//     imageUrl: string;
// };
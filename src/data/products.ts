import { Product } from '../types';
import API from '../utils/axios';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get(`/products`);
    return res.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get(`/products`);
    const products = res.data;

    // Shuffle the array
    const shuffled = products.sort(() => 0.5 - Math.random());

    // Return the first 4 items
    return shuffled.slice(0, 4);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const { data: products } = await API.get<Product[]>('/products');

    return products.filter(({ category }) => {
      const categoryIdFromProduct = typeof category === 'object' ? category._id : category;
      return categoryIdFromProduct === categoryId;
    });
  } catch (error) {
    console.error('❌ Failed to fetch products by category:', error);
    return [];
  }
};


export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

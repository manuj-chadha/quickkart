// import { Category } from '../types';

// export const categories: Category[] = [
//   {
//     _id: 'fruits',
//     name: 'Fruits',
//     iconBanner: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   },
//   {
//     _id: 'vegetables',
//     name: 'Vegetables',
//     iconBanner: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   },
//   {
//     _id: 'meat',
//     name: 'Meat',
//     iconBanner: 'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   },
//   {
//     _id: 'seafood',
//     name: 'Seafood',
//     iconBanner: 'https://images.pexels.com/photos/2252278/pexels-photo-2252278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   },
//   {
//     _id: 'dairy',
//     name: 'Dairy & Eggs',
//     iconBanner: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   },
//   {
//     _id: 'bakery',
//     name: 'Bakery',
//     iconBanner: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//   }
// ];
// data/categories.ts
import { Category } from '../types';
import API from '../utils/axios';

// export interface Category {
//   _id: string;
//   name: string;
//   iconBanner: string;
// }

export const getCategories = async (): Promise<Category[]> => {
  
  try {
    const res = await API.get('/categories');
    return res.data;
  } catch (err) {
    console.error('Error fetching category:', err);
    return [];
  }
};

export const getCategoryById = async (_id: string): Promise<Category | null> => {
  try {
    const res = await API.get(`/categories/${_id}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching category:', err);
    return null;
  }
};

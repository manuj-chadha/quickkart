import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import API from '../../utils/axios'; // Axios instance with base URL + token setup
import { Category } from '../../types';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (err) {
        setError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await API.delete(`/categories/${_id}`);
      setCategories((prev) => prev.filter((category) => category._id !== _id));
      alert('Category deleted successfully!');
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert('Failed to delete category.');
    }
  };

  if (loading) return <div className="text-center mt-8 text-gray-600">Loading categories...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <Link to="/admin/categories/new">
          <Button variant="primary" size="md">
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 w-full overflow-hidden">
              <img
                src={category.iconBanner}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/admin/categories/edit/${category._id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/axios';
import { Button } from '../../components/common/Button';

const CategoryFormPage: React.FC = () => {
  const { id } = useParams(); // if present, it's edit mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subcategories: '',
    displayOrder: '',
    iconBanner: null as File | null,
  });

  useEffect(() => {
    if (isEditMode) {
      API.get(`/categories/${id}`)
        .then((res) => {
          const cat = res.data;
          setFormData({
            name: cat.name || '',
            description: cat.description || '',
            subcategories: (cat.subcategories || []).join(', '),
            displayOrder: cat.displayOrder?.toString() || '',
            iconBanner: null,
          });
        })
        .catch((err) => {
          console.error('Failed to load category:', err);
          alert('Failed to load category');
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, iconBanner: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('subcategories', formData.subcategories);
    data.append('displayOrder', formData.displayOrder || '0');
    if (formData.iconBanner) {
      data.append('iconBanner', formData.iconBanner);
    }

    try {
      if (isEditMode) {
        await API.put(`/categories/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Category updated successfully');
      } else {
        await API.post('/categories', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Category added successfully');
      }

      navigate('/admin/categories'); // adjust path as per your routing
    } catch (err: any) {
      console.error(err);
      alert('Error saving category: ' + (err?.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">{isEditMode ? 'Edit' : 'Add'} Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Category Name"
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="subcategories"
          value={formData.subcategories}
          placeholder="Subcategories (comma separated)"
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="displayOrder"
          value={formData.displayOrder}
          placeholder="Display Order"
          onChange={handleChange}
          className="input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input"
        />

        <Button type="submit" variant="primary" size="md">
          {isEditMode ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </div>
  );
};

export default CategoryFormPage;

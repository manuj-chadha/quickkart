import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import API from '../../utils/axios';

const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // productId for edit mode
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    priceMRP: '',
    discountPrice: '',
    weightValue: '',
    weightUnit: '',
    stockCount: '',
    images: [] as File[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchProduct = async () => {
      if (!isEditMode) return;
      try {
        const res = await API.get(`/products/${id}`);
        const product = res.data;

        setFormData({
          name: product.name,
          description: product.description,
          category: product.category._id,
          subcategory: product.subcategory || '',
          priceMRP: product.priceMRP.toString(),
          discountPrice: product.discountPrice?.toString() || '',
          weightValue: product.weightUnit?.value?.toString() || '',
          weightUnit: product.weightUnit?.unit || '',
          stockCount: product.stockCount.toString(),
          images: [], // You won’t pre-fill File[] — backend images handled separately
        });
      } catch (error) {
        console.error('Failed to load product', error);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    if (formData.weightValue && formData.weightUnit) {
      data.append('weightValue', formData.weightValue);
      data.append('weightUnit', formData.weightUnit);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach(file => data.append('images', file));
      } else if (!['weightValue', 'weightUnit'].includes(key)) {
        data.append(key, value as string);
      }
    });

    try {
      if (isEditMode) {
        await API.put(`/products/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product updated successfully!');
      } else {
        await API.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product added successfully!');
      }

      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Error while saving product.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="name" value={formData.name} placeholder="Product Name" className="input" onChange={handleChange} required />
        <textarea name="description" value={formData.description} placeholder="Description" className="input" rows={3} onChange={handleChange} required />
        
        <select name="category" className="input" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="text" name="subcategory" value={formData.subcategory} placeholder="Subcategory" className="input" onChange={handleChange} />
        <input type="number" name="priceMRP" value={formData.priceMRP} placeholder="Price MRP" className="input" onChange={handleChange} required />
        <input type="number" name="discountPrice" value={formData.discountPrice} placeholder="Discount Price" className="input" onChange={handleChange} />
        <input type="number" name="weightValue" value={formData.weightValue} placeholder="Weight Value" className="input" onChange={handleChange} />
        
        <select name="weightUnit" value={formData.weightUnit} className="input" onChange={handleChange}>
          <option value="">Unit</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="Ltr">Ltr</option>
          <option value="pcs">pcs</option>
        </select>

        <input type="number" name="stockCount" value={formData.stockCount} placeholder="Stock Count" className="input" onChange={handleChange} required />
        <input type="file" multiple name="images" onChange={handleFileChange} className="input" />

        <Button variant="primary" size="md" type="submit">
          {isEditMode ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
};

export default ProductCreatePage;

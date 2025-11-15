// Form component for creating and editing items with client-side validation
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';

const CATEGORIES = ['Electronics', 'Clothing', 'Furniture','Groceries','Food', 'Other'];

const ItemForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, addItem, updateItem } = useItems();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 0,
    price: 0,
    description: '',
    category: 'Other',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load item data if editing
  useEffect(() => {
    if (isEdit) {
      const item = items.find((i) => i._id === id);
      if (item) {
        setFormData({
          itemName: item.itemName || '',
          quantity: item.quantity || 0,
          price: item.price || 0,
          description: item.description || '',
          category: item.category || 'Other',
        });
      }
    }
  }, [id, isEdit, items]);

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    // Item name validation - only letters and spaces
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.itemName)) {
      newErrors.itemName = 'Item name must contain only letters and spaces';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    } else if (!CATEGORIES.includes(formData.category)) {
      newErrors.category = 'Please select a valid category';
    }

    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity < 0) {
      newErrors.quantity = 'Quantity must be a non-negative integer';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For item name, only allow letters and spaces
    if (name === 'itemName') {
      if (value === '' || /^[a-zA-Z\s]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const submitData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      };

      if (isEdit) {
        await updateItem(id, submitData);
      } else {
        await addItem(submitData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
          {isEdit ? 'Edit Item' : 'Add New Item'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {isEdit ? 'Update item details below' : 'Fill in the details to add a new item to your inventory'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                errors.itemName 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter item name (letters only)"
              required
            />
            {errors.itemName && (
              <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">{errors.itemName}</p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                errors.quantity 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-2 sm:top-3 text-gray-500 font-semibold text-sm sm:text-base">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                  errors.price 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">{errors.price}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                errors.category 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs sm:text-sm text-red-600 font-medium">{errors.category}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm sm:text-base"
              placeholder="Enter item description (optional)"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold transition-all duration-200 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                {isEdit ? (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Item
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Item
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;

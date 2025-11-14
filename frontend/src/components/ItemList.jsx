// Component for displaying list of items with View, Edit, Delete actions
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import ConfirmModal from './ConfirmModal';

const ItemList = () => {
  const { items, loading, error, deleteItem } = useItems();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteItem(deleteConfirm);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Items</div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Inventory Items</h1>
          <p className="text-gray-600">Manage your inventory items efficiently</p>
        </div>
        <Link
          to="/items/new"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Items Found</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your inventory is empty. Start by adding your first item to get started!
            </p>
            <Link
              to="/items/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Item
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop table view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/items/${item._id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline transition-colors"
                      >
                        {item.itemName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{item.quantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">${item.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          to={`/items/${item._id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          to={`/items/${item._id}/edit`}
                          className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(item._id)}
                          className="text-red-600 hover:text-red-800 font-medium hover:underline transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item._id} className="p-5 hover:bg-gray-50 transition-colors">
                <Link
                  to={`/items/${item._id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-xl mb-3 block hover:underline transition-colors"
                >
                  {item.itemName}
                </Link>
                <div className="space-y-2 mb-4">
                  {item.category && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Category:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Quantity:</span>
                    <span className="text-sm font-semibold text-gray-900">{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Price:</span>
                    <span className="text-sm font-bold text-green-600">${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 border-t border-gray-200">
                  <Link
                    to={`/items/${item._id}`}
                    className="flex-1 text-center text-blue-600 hover:text-blue-800 font-medium py-2 px-3 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    to={`/items/${item._id}/edit`}
                    className="flex-1 text-center text-green-600 hover:text-green-800 font-medium py-2 px-3 rounded-md hover:bg-green-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(item._id)}
                    className="flex-1 text-center text-red-600 hover:text-red-800 font-medium py-2 px-3 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
};

export default ItemList;

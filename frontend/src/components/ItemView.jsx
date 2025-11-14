// Component for displaying full item details
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';

const ItemView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, loading } = useItems();

  const item = items.find((i) => i._id === id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h2>
        <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Inventory
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{item.itemName}</h2>
              {item.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                  {item.category}
                </span>
              )}
            </div>
            <Link
              to={`/items/${id}/edit`}
              className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center gap-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Item
            </Link>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Quantity</label>
              </div>
              <p className="text-3xl font-bold text-blue-900">{item.quantity}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Price</label>
              </div>
              <p className="text-3xl font-bold text-green-900">${item.price.toFixed(2)}</p>
            </div>
          </div>

          {item.description && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Description
              </label>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Created At
                </label>
                <p className="text-gray-700 font-medium">
                  {new Date(item.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Last Updated
                  </label>
                  <p className="text-gray-700 font-medium">
                    {new Date(item.updatedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemView;

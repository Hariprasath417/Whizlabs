// React Context for managing items state and operations
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getItems, postItem, editItem, deleteItem as deleteItemAPI } from '../api/api';

const ItemsContext = createContext();

// Module-level flag to prevent duplicate fetches across remounts (React StrictMode)
let fetchInitialized = false;
let fetchPromise = null;

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider');
  }
  return context;
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  // Fetch all items (with state updates for manual calls)
  const fetchItems = async (category = '') => {
    try {
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }
      const response = await getItems(category);
      const data = response.data || [];
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setItems(data);
        setLoading(false);
      }
      return data;
    } catch (err) {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching items:', err);
      }
      throw err;
    }
  };

  // Add new item
  const addItem = async (itemData) => {
    try {
      setError(null);
      const response = await postItem(itemData);
      setItems((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update existing item
  const updateItem = async (id, itemData) => {
    try {
      setError(null);
      const response = await editItem(id, itemData);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      setError(null);
      await deleteItemAPI(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fetch items on mount - only once (even in React StrictMode)
  useEffect(() => {
    isMountedRef.current = true;

    // Helper function to handle promise result
    const handleFetchResult = (data) => {
      if (isMountedRef.current) {
        setItems(data || []);
        setLoading(false);
      }
    };

    const handleFetchError = (err) => {
      if (isMountedRef.current) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching items:', err);
      }
    };

    // If fetch is already in progress or completed, subscribe to existing promise
    if (fetchPromise) {
      // Promise already exists (from previous mount in StrictMode), just subscribe
      fetchPromise.then(handleFetchResult).catch(handleFetchError);
    } else if (!fetchInitialized) {
      // If fetch hasn't been initialized, start it (direct API call, no state updates in fetchItems)
      fetchInitialized = true;
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }
      
      // Create promise directly using getItems (module-level import)
      fetchPromise = getItems()
        .then((response) => response.data || [])
        .catch((err) => {
          throw err;
        });
      
      fetchPromise.then(handleFetchResult).catch(handleFetchError);
    }

    // Cleanup function to mark component as unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const value = {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};


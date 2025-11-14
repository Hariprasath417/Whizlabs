// Main App component with routing and context provider
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ItemsProvider } from './context/ItemsContext';
import Layout from './components/Layout';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemView from './components/ItemView';

function App() {
  return (
    <ItemsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/:id/edit" element={<ItemForm />} />
            <Route path="/items/:id" element={<ItemView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </ItemsProvider>
  );
}

export default App;

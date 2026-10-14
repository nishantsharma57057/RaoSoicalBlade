import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/reference.css';

const root = document.getElementById('root');
if (!root) throw new Error('Website root was not found.');
createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);

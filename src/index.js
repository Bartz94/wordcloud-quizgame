import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <Router>
    <App />
  </Router>
</React.StrictMode>);

reportWebVitals();

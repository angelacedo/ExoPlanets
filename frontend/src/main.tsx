import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DashBoard from './components/DashBoard/DashBoard';
import Header from './components/Header/Header';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <DashBoard />
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Index from './components/Index';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
  </StrictMode>,
);
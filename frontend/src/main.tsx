import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from './components/DashBoard/DashBoard';
import Header from './components/Header/Header';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<DashBoard />} />
        <Route path='/repository' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

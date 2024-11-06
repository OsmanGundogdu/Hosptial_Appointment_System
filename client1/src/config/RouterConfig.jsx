import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Manager from '../pages/Manager';
import AddHasta from '../pages/AddHasta';
import AddDoktor from '../pages/AddDoktor';
import AddRapor from '../pages/AddRapor';
import DoktorHomePage from '../pages/DoktorHomePage'
import HastaHomePage from '../pages/HastaHomePage'
import RandevuPage from '../pages/RandevuPage'

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/add-hasta" element={<AddHasta />} />
      <Route path="/add-doktor" element={<AddDoktor />} />
      <Route path="/add-rapor" element={<AddRapor />} />
      <Route path="/doktor-home-page/:doktorId" element={<DoktorHomePage />} />
      <Route path="/hasta-home-page/:hastaId" element={<HastaHomePage />} />
      <Route path="/randevu-page/:hastaId/:doktorId" element={<RandevuPage />} />
    </Routes>
  );
}

export default RouterConfig;


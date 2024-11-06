
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Manager.css';

function Manager() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleHasta = () => {
    navigate('/add-hasta');
  };

  const handleDoktor = () => {
    navigate('/add-doktor');
  };

  const handleRapor = () => {
    navigate('/add-rapor');
  };

  return (
    <div className="manager-container">
      <button className="back-button" onClick={handleBack}>Geri</button>
      <button className='button' onClick={handleHasta}>HASTA EKLE</button>
      <button className='button' onClick={handleDoktor}>DOKTOR EKLE</button>
      <button className='button' onClick={handleRapor}>RAPOR EKLE</button>
      
    </div>
  );
}

export default Manager;

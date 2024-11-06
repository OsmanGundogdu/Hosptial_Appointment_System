import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/DoktorHomePage.css';
import image from '../image/login.jpg';
import axios from 'axios';

function DoktorHomePage() {
  const navigate = useNavigate();
  const { doktorId } = useParams();
  
  const [randevular, setRandevular] = useState([]);

  useEffect(() => {
    console.log('DoktorId:', doktorId);  // Debug için eklendi

    if (doktorId) {
      axios.get(`http://localhost:4000/getRandevular/${doktorId}`)
        .then(response => {
          console.log(response.data);
          setRandevular(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("DoktorId is undefined");
    }
  }, [doktorId]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="doktor-home-container" style={{ backgroundImage: `url(${image})` }}>
      <button className="back-button" onClick={handleBack}>Geri</button>
      <div className="randevu-list">
        {randevular.map((randevu, index) => (
          <div key={index} className="randevu-card">
            <h3>Hasta: {randevu.Isim}</h3>
            <p>Tarih: {randevu.RandevuTarihi}</p>
            <p>Saat: {randevu.RandevuSaati}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoktorHomePage;

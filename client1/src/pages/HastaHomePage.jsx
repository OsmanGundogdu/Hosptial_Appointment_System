import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/HastaHomePage.css';
import image from '../image/login.jpg';
import axios from 'axios';

function HastaHomePage() {
  const navigate = useNavigate();

  const { hastaId } = useParams();

  const [doktorlar, setDoktorlar] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getDoktorlar")
      .then(response => {
        console.log(response.data);
        setDoktorlar(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRandevuAl = (hastaId,doktorId) => {
    if (doktorlar.length > 0) {
      navigate(`/randevu-page/${hastaId}/${doktorId}`);
    } else {
      console.error("Doktorlar listesi boş!");
    }
  };

  return (
    <div className="hasta-home-container" style={{ backgroundImage: `url(${image})` }}>
      <button className="back-button" onClick={() => navigate('/')}>Geri</button>
      <div className="doktor-list">
        {doktorlar.map((doktor, index) => (
          <div className="doktor-card" key={index}>
            <h3>{doktor.Isim} {doktor.Soyisim}</h3>
            <p>{doktor.UzmanlikAlani}</p>
            <button className='randevu-al' onClick={() => handleRandevuAl(hastaId,doktor.DoktorId)}>Randevu Al</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HastaHomePage;

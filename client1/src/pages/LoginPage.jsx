import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../css/LoginPage.css';
import image from '../image/login.jpg';
import axios from 'axios';


function LoginPage() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/manager');
  };

  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');

  
   const [user, setUser] = useState([]);
  
   const handleLogin = async (isim, soyisim) => {
    try {
      const response = await axios.get("http://localhost:4000/login");
      console.log(response.data);
      const users = response.data;
  
      // Her bir kullanıcı için kontrol yapma
      users.forEach(user => {
        if (user.Tip === 'Doktor' && user.Isim === isim && user.Soyisim === soyisim) {
          navigate(`/doktor-home-page/${user.Id}`);
        } else if (user.Tip === 'Hasta' && user.Isim === isim && user.Soyisim === soyisim) {
          navigate(`/hasta-home-page/${user.Id}`);
        }
      });
    } catch (error) {
      console.error("Error authenticating user:", error);
      // Optionally display an error message to the user
    }
  };
  


  return (
    <div className="Login-page" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '100vh', width: '100vw' }}>
      <div className="header">
        <h1>PROLAB HASTANESİ</h1>
      </div>
      <div className="form-container">
        <div className='flex-row'>
          <label htmlFor="isim">Adınız:</label>
          <input type="text" id="isim" value={isim} onChange={(e) => setIsim(e.target.value)} />
        </div>
        <div className='flex-row'>
          <label htmlFor="soyisim">Şifreniz:</label>
          <input type="password" id="soyisim" value={soyisim} onChange={(e) => setSoyisim(e.target.value)} />
        </div>
        <div className="button-container">
          <button className="login-button" onClick={() => handleLogin(isim, soyisim)}>GİRİŞ YAP</button>
        </div>
        <div className="admin-button-container">
          <button className="admin-login-button" onClick={handleAdminLogin}>YÖNETİCİ GİRİŞ</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


import React, { useState, useEffect } from 'react';
import '../css/AddHasta.css';
import image from '../image/login.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddHasta() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/manager');
    };

    const generateRandomId = () => {
        return Math.floor(1000 + (Math.random() * 9999999));
    };

    const [hastalar, setHastalar] = useState([]);
   
    const [hasta, setHasta] = useState({
        HastaId: generateRandomId(),
        Isim: '',
        Soyisim: '',
        DogumTarihi: '',
        Cinsiyet: '',
        TelefonNumarasi: '',
        Adres: ''
    });

    useEffect(() => {
        axios.get("http://localhost:4000/getHastalar")
            .then(response => {
               console.log(response.data) 
               setHastalar(response.data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const handleAddHasta = (isim) => {
        if (
            !hasta.Isim ||
            !hasta.Soyisim ||
            !hasta.DogumTarihi ||
            !hasta.Cinsiyet ||
            !hasta.TelefonNumarasi 
        ) {
            window.alert('Doldurulması gereken alanlar mevcut!');
            return;
        }
        
        if (window.confirm(isim + ' isimli hasta eklenecektir!')) {
            axios.post("http://localhost:4000/addHasta", hasta)
                .then(response => {
                    setHastalar(prevHastalar => [...prevHastalar, response.data]);
                    setHasta({
                        HastaId: generateRandomId(),
                        Isim: '',
                        Soyisim: '',
                        DogumTarihi: '',
                        Cinsiyet: '',
                        TelefonNumarasi: '',
                        Adres: ''
                    });
                })
            .catch(error => {
                console.error("Error adding patient:", error);
            });
        }
    };
    
    const deleteHasta = (id, isim) => {
        if (window.confirm(isim + ' isimli hasta silinecektir!')) {
            axios
                .delete(`http://localhost:4000/deleteHasta/${id}`)
                .then(response => {
                    console.log(response.data);
                    setHastalar(prevHastalar => prevHastalar.filter(hasta => hasta.HastaId !== id));
                })
                .catch(error => {
                    console.error("Error deleting data:", error);
                });
        }
    };
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHasta(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

        return formattedDate;
    };

    return (
        <div className="add-hasta-container" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <button className="back-button" onClick={handleBack}>Geri</button>
            <input type="text" name="Isim" value={hasta.Isim} onChange={handleChange} placeholder="Ad" />
            <input type="text" name="Soyisim" value={hasta.Soyisim} onChange={handleChange} placeholder="Soyad" />
            <input type="text" name="DogumTarihi" value={hasta.DogumTarihi} onChange={handleChange} placeholder="Doğum Tarihi" />
            <select name="Cinsiyet" value={hasta.Cinsiyet} onChange={handleChange}>
                <option value="">Cinsiyet Seçiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
            </select>
            <input type="text" name="TelefonNumarasi" value={hasta.TelefonNumarasi} onChange={handleChange} placeholder="Telefon Numarası" />
            <input type="text" name="Adres" value={hasta.Adres} onChange={handleChange} placeholder="Adres" />
            <button className="add-button" onClick={() => handleAddHasta(hasta.Isim)}>HASTA EKLE</button>

            <div className="hasta-list" style={{ position: 'absolute', top: '15px', left: '800px' }}>
                <h3 style={{ fontFamily: 'arial', fontSize: '35px' }}> Hastalar</h3>
                <ul>
                 {hastalar.map((hasta, index) => (
                       <li key={index}>
                              {hasta.Isim} {hasta.Soyisim} - {formatDate(hasta.DogumTarihi)} - {hasta.Cinsiyet}
                         <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteHasta(hasta.HastaId,hasta.Isim)}>❌</span>
                       </li>
                  ))}
                </ul>
            </div>
        </div>
    );
}

export default AddHasta;

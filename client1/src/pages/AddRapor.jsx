import React, { useState, useEffect } from 'react';
import '../css/AddRapor.css';
import image from '../image/login.jpg';
import { useNavigate } from 'react-router-dom';

function AddRapor() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/manager');
    };

    const [rapor, setRapor] = useState({
        raporID: '',
        raporTarihi: '',
        raporIcerigi: ''
    });

    const [raporlar, setRaporlar] = useState([]);

    useEffect(() => {
        const savedRaporlar = JSON.parse(localStorage.getItem('raporlar'));
        if (savedRaporlar) {
            setRaporlar(savedRaporlar);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('raporlar', JSON.stringify(raporlar));
    }, [raporlar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRapor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        setRaporlar(prevRaporlar => [...prevRaporlar, rapor]);
        setRapor({
            raporID: '',
            raporTarihi: '',
            raporIcerigi: ''
        });
    };

    const handleRemove = (index) => {
        setRaporlar(prevRaporlar => prevRaporlar.filter((_, i) => i !== index));
    };

    return (
        <div className="add-rapor-container" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <button className="back-button" onClick={handleBack}>Geri</button>
            <input type="text" name="raporID" value={rapor.raporID} onChange={handleChange} placeholder="Rapor ID" />
            <input type="text" name="raporTarihi" value={rapor.raporTarihi} onChange={handleChange} placeholder="Rapor Tarihi" />
            <textarea name="raporIcerigi" value={rapor.raporIcerigi} onChange={handleChange} placeholder="Rapor İçeriği" rows="6"></textarea>
            <button className="add-button" onClick={handleSubmit}>RAPOR EKLE</button>

            <div className="rapor-list" style={{ position: 'absolute', top: '15px', left: '800px' }}>
                <h3 style={{ fontFamily: 'arial', fontSize: '35px' }}>Eklenen Raporlar</h3>
                <ul>
                    {raporlar.map((rapor, index) => (
                        <li key={index}>
                            {rapor.raporID} {rapor.raporTarihi}
                            <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleRemove(index)}>❌</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AddRapor;

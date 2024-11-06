import React, { useState, useEffect } from 'react';
import '../css/AddDoktor.css';
import image from '../image/login.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function AddDoktor() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/manager');
    };

    const generateRandomId = () => {
        return Math.floor(1000 + (Math.random() * 9999999));
    };


    const [doktorlar, setDoktorlar] = useState([]);

    const [doktor, setDoktor] = useState({
        DoktorId: generateRandomId(),
        Isim: '',
        Soyisim: '',
        UzmanlikAlani: '',
        CalistigiHastane: '',
    });
    useEffect(() => {
        axios.get("http://localhost:4000/getDoktorlar")
            .then(response => {
               console.log(response.data) 
               setDoktorlar(response.data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoktor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddDoktor = (isim) => {
        if (
            !doktor.Isim ||
            !doktor.Soyisim ||
            !doktor.UzmanlikAlani ||
            !doktor.CalistigiHastane
        ) {
            window.alert('Doldurulması gereken alanlar mevcut!');
            return;
        }
        if (window.confirm(isim + ' isimli doktor eklenecektir!')) {
        axios.post("http://localhost:4000/addDoktor", doktor)
            .then(response => {
                setDoktorlar(prevDoktorlar => [...prevDoktorlar, response.data]);
                setDoktor({
                    DoktorId: generateRandomId(),
                    Isim: '',
                    Soyisim: '',
                    UzmanlikAlani: '',
                    CalistigiHastane: '',
                });
            })
            .catch(error => {
                console.error("Error adding doctor:", error);
            });
        }
    };

    const deleteDoktor = (id, isim) => {
        if (window.confirm(isim + ' isimli doktor silinecektir!')) {
            axios
                .delete(`http://localhost:4000/deleteDoktor/${id}`)
                .then(response => {
                    console.log(response.data);
                    setDoktorlar(prevDoktorlar => prevDoktorlar.filter(doktor => doktor.DoktorId !== id));
                })
                .catch(error => {
                    console.error("Error deleting data:", error);
                });
        }
    };

    return (
        <div className="add-doktor-container" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <button className="back-button" onClick={handleBack}>Geri</button>
            <input type="text" name="Isim" value={doktor.Isim} onChange={handleChange} placeholder="Ad" />
            <input type="text" name="Soyisim" value={doktor.Soyisim} onChange={handleChange} placeholder="Soyad" />
            <input type="text" name="UzmanlikAlani" value={doktor.UzmanlikAlani} onChange={handleChange} placeholder="Uzmanlık Alanı" />
            <input type="text" name="CalistigiHastane" value={doktor.CalistigiHastane} onChange={handleChange} placeholder="Çalıştığı Hastane" />
            <button className="add-button" onClick={() => handleAddDoktor(doktor.Isim)} >DOKTOR EKLE</button>

            <div className="doktor-list" style={{ position: 'absolute', top: '15px', left: '800px', flexDirection:'column'}}>
                <h3 style={{ fontFamily: 'arial', fontSize: '35px' ,color:'black' }}>Doktorlar</h3>
                <ul style={{color:'black'}}>
                {doktorlar.map((doktor, index) => (
                       <li key={index}>
                              {doktor.Isim} {doktor.Soyisim} - {doktor.UzmanlikAlani}
                            <span style={{ justifyContent: 'flex-end', cursor: 'pointer' }} onClick={() => deleteDoktor(doktor.DoktorId, doktor.Isim)}>❌</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AddDoktor;

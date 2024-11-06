import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/RandevuPage.css';
import image from '../image/login.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RandevuPage = () => {
  const { doktorId, hastaId } = useParams();
  const navigate = useNavigate();

  const generateRandomId = () => {
    return Math.floor(1000 + (Math.random() * 9999999));
  };


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = ["09.00", "10.00", "11.00", "13.00", "14.00", "15.00"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleRandevuAl = () => {
    if (!selectedDate || !selectedSlot) {
      window.alert('Tarih ve saat seçiniz.');
      return;
    }
  
    const randevu = {
      RandevuId: generateRandomId(),
      RandevuTarihi: selectedDate,
      RandevuSaati: selectedSlot,
      HastaId: hastaId,
      DoktorId: doktorId
    };
  
    if (window.confirm('Seçili randevu eklenecektir!')) {
      axios.post("http://localhost:4000/addRandevu", randevu)
        .then(response => {
          setSelectedDate(null);
          setSelectedSlot(null);
          console.log('Randevu başarıyla eklendi:', response.data);
        })
        .catch(error => {
          console.error("Error adding appointment:", error);
        });
    }
  };
  

  return (
    <div className="schedule-container" style={{ backgroundImage: `url(${image})` }}>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(`/hasta-home-page/${hastaId}`)}> Geri </button>
      </div>
      <div className="content-container">
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Geçmiş tarihleri engeller
            placeholderText="Tarih Seçin"
          />
        </div>
        {selectedDate && (
          <div className="time-slots">
            {slots.map(slot => (
              <div
                key={slot}
                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slot)}
                disabled={selectedSlot && selectedSlot !== slot}
              >
                {slot}
              </div>
            ))}
          </div>
        )}
        <div className="randevu-button-container">
          <button
            className="randevu-button"
            onClick={handleRandevuAl}
            disabled={!selectedDate || !selectedSlot}
          >
            Randevu Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandevuPage;

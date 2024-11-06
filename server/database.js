  const { Client } = require('pg');

  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '12345',
    port: 5432,
  });

  client.connect(err => {
    if (err) {
      console.error("--> Db'ye bağlanamadı <--", err);
    } else {
      console.log("--> Db bağlantısı tamamlandı <--");
    }
  });

  module.exports = client; // Veritabanı bağlantısını dışa aktar

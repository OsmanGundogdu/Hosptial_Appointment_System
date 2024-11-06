// const express = require("express");
// const cors = require("cors");
// const app = express();
// // const bodyParser = require("body-parser"); // body-parser kütüphanesini ekliyoruz
// app.use(express.json()); // body-parser middleware'ini kullanıyoruz
// app.use(cors());

// app.get("/adduser", (req, res) => { // "POST" isteği yapmak için "/adduser" endpoint'ini kullanıyoruz
//     console.log(req.body);
//     res.send("Hasta Adı: " + Hastalar.id ); // Sunucudan yanıtı JSON formatında gönderiyoruz
// });

// app.listen(4000, () => 
//     console.log("server on localhost:4000")
// );

const express = require("express");
const cors = require("cors");
const client = require("./database"); // Veritabanı bağlantısını içe aktar
const app = express();

    app.use(express.json());
    app.use(cors());

    app.get("/login", async (req, res) => {
        try {
            const results = await client.query('SELECT "Doktorlar"."DoktorId" AS "Id", "Doktorlar"."Isim", "Doktorlar"."Soyisim", "Doktorlar"."Tip" FROM public."Doktorlar" UNION SELECT "Hastalar"."HastaId" AS "Id", "Hastalar"."Isim", "Hastalar"."Soyisim", "Hastalar"."Tip" FROM public."Hastalar"');
            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error authenticating user:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    

    app.get("/getRandevular/:doktorId", async (req, res) => {
        try {
            const doktorId = req.params.doktorId;
            const query = `SELECT b."Isim", TO_CHAR(c."RandevuTarihi", 'DD-MM-YYYY') AS "RandevuTarihi", c."RandevuSaati" FROM public."Randevu" c LEFT OUTER JOIN public."Doktorlar" a ON a."DoktorId" = c."DoktorId" LEFT OUTER JOIN public."Hastalar" b ON b."HastaId" = c."HastaId" WHERE a."DoktorId" = $1`;
            const results = await client.query(query, [doktorId]);
            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error fetching data from database:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    

    app.post("/addHasta", async (req, res) => {
        const { HastaId, Isim, Soyisim, DogumTarihi, Cinsiyet, TelefonNumarasi, Adres } = req.body;

        try {
            console.log("Received request to add patient:", req.body);

            const result = await client.query(
                'INSERT INTO public."Hastalar" ("HastaId", "Isim", "Soyisim", "DogumTarihi", "Cinsiyet", "TelefonNumarasi", "Adres","Tip") VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
                [HastaId, Isim, Soyisim, DogumTarihi, Cinsiyet, TelefonNumarasi, Adres,"Hasta"]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Error adding patient to database:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.post("/addDoktor", async (req, res) => {
        const { DoktorId, Isim, Soyisim, UzmanlikAlani, CalistigiHastane} = req.body;

        try {
            console.log("Received request to add doctor:", req.body);

            const result = await client.query(
                'INSERT INTO public."Doktorlar" ("DoktorId", "Isim", "Soyisim", "UzmanlikAlani", "CalistigiHastane","Tip") VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
                [DoktorId, Isim, Soyisim, UzmanlikAlani, CalistigiHastane,'Doktor']
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Error adding doctor to database:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.post("/addRandevu", async (req, res) => {
        const { RandevuId, RandevuTarihi, RandevuSaati, HastaId, DoktorId} = req.body;

        try {
            console.log("Received request to add patient:", req.body);

            const result = await client.query(
                'INSERT INTO public."Randevu" ("RandevuId", "RandevuTarihi", "RandevuSaati", "HastaId", "DoktorId") VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [RandevuId, RandevuTarihi, RandevuSaati, HastaId, DoktorId]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Error adding appointment to database:", error);
            res.status(500).send("Internal Server Error");
        }
    });


    app.get("/getHastalar", async (req, res) => {
        try {
            const results = await client.query('SELECT * FROM public."Hastalar" ORDER BY "HastaId" ASC');
            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error fetching data from database:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.get("/getDoktorlar", async (req, res) => {
        try {
            const results = await client.query('SELECT * FROM public."Doktorlar" ORDER BY "DoktorId" ASC');
            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error fetching data from database:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.delete("/deleteHasta/:hastaId", async (req, res) => {
        const { hastaId } = req.params;

        try {
            // Veritabanından hastayı silme
            const result = await client.query('DELETE FROM public."Hastalar" WHERE "HastaId" = $1', [hastaId]);

            if (result.rowCount === 1) {
                // Başarı durumunda
                res.status(200).json({ message: "Hasta başarıyla silindi." });
            } else {
                // Hasta bulunamadıysa
                res.status(404).json({ message: "Belirtilen ID'ye sahip hasta bulunamadı." });
            }
        } catch (error) {
            // Hata durumunda
            console.error("Error deleting patient from database:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.delete("/deleteDoktor/:doktorId", async (req, res) => {
        const { doktorId } = req.params;

        try {
            // Veritabanından hastayı silme
            const result = await client.query('DELETE FROM public."Doktorlar" WHERE "DoktorId" = $1', [doktorId]);

            if (result.rowCount === 1) {
                res.status(200).json({ message: "Doktor başarıyla silindi." });
            } else {
                res.status(404).json({ message: "Belirtilen ID'ye sahip doktor bulunamadı." });
            }
        } catch (error) {
            console.error("Error deleting doctor from database:", error);
            res.status(500).send("Internal Server Error");
        }
    });


    app.listen(4000, () => 
        console.log("server on localhost:4000")
    );

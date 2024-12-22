const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const Policy = require('./models');

dotenv.config(); // .env dosyasını yükle

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Veritabanına bağlan
connectDB();

// API Endpoint'leri

// Tüm poliçeleri getir
app.get('/policies', async (req, res) => {
    try {
        const policies = await Policy.find(); // Tüm verileri getir
        res.status(200).json(policies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Poliçe detaylarını getir
app.get('/policies/:id', async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);
        if (!policy) {
            return res.status(404).json({ message: 'Poliçe bulunamadı.' });
        }
        res.status(200).json(policy);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Yeni poliçe ekle
app.post('/policies', async (req, res) => {
    try {
        const newPolicy = new Policy(req.body);
        const savedPolicy = await newPolicy.save();
        res.status(201).json(savedPolicy);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Poliçeyi güncelle
app.put('/policies/:id', async (req, res) => {
    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPolicy) {
            return res.status(404).json({ message: 'Poliçe bulunamadı.' });
        }
        res.status(200).json(updatedPolicy);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Poliçeyi sil
app.delete('/policies/:id', async (req, res) => {
    try {
        const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
        if (!deletedPolicy) {
            return res.status(404).json({ message: 'Poliçe bulunamadı.' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

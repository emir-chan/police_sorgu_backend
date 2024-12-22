const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Çevresel değişkenlerden URI al
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı!');
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err.message);
        process.exit(1); // Hata durumunda uygulamayı sonlandır
    }
};

module.exports = connectDB;

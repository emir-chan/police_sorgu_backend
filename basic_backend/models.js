const mongoose = require('mongoose');

// Poliçe Şeması Tanımı
const policySchema = new mongoose.Schema({
    policyNumber: String,
    holder: {
        name: String,
        nationalID: String,
        birthDate: Date,
        phone: String
    },
    property: {
        address: {
            street: String,
            city: String,
            district: String,
            postalCode: String
        },
        type: String,
        constructionYear: Number,
        insuranceValue: Number
    },
    coverage: {
        earthquake: Boolean,
        fire: Boolean,
        flood: Boolean
    },
    premium: {
        totalAmount: Number,
        paymentSchedule: [
            {
                paymentNumber: Number,
                amount: Number,
                dueDate: Date,
                status: String
            }
        ]
    },
    startDate: Date,
    endDate: Date,
    status: String
});

// Model Tanımı
const Policy = mongoose.model('police1', policySchema);

module.exports = Policy;

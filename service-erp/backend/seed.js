require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('./src/models/appModels/Client');
const Invoice = require('./src/models/appModels/Invoice');
const Quote = require('./src/models/appModels/Quote');

const DATABASE = "mongodb://127.0.0.1:27019/idurar_erp";

async function seedData() {
  try {
    await mongoose.connect(DATABASE);
    console.log('Connected to DB');

    // Clear old data
    await Client.deleteMany({});
    await Invoice.deleteMany({});
    await Quote.deleteMany({});

    // Create Clients
    const clients = [];
    for (let i = 1; i <= 10; i++) {
      const client = new Client({
        removed: false,
        enabled: true,
        company: `Entreprise Fictive ${i}`,
        managerName: `Directeur ${i}`,
        managerSurname: `Nom ${i}`,
        email: `contact${i}@entreprise${i}.com`,
        phone: `+21260000000${i}`,
      });
      clients.push(await client.save());
    }
    console.log('10 clients created.');

    // Create Invoices and Quotes
    for (let i = 0; i < clients.length; i++) {
      const invoice = new Invoice({
        removed: false,
        client: clients[i]._id,
        number: 1000 + i,
        year: 2026,
        date: new Date(),
        expiredDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
        status: 'pending',
        subTotal: 1000 + i * 100,
        taxTotal: 200 + i * 20,
        total: 1200 + i * 120,
        credit: 0,
        discount: 0,
        pdfUri: ''
      });
      await invoice.save();

      const quote = new Quote({
        removed: false,
        client: clients[i]._id,
        number: 2000 + i,
        year: 2026,
        date: new Date(),
        expiredDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
        status: 'pending',
        subTotal: 1000 + i * 100,
        taxTotal: 200 + i * 20,
        total: 1200 + i * 120,
        pdfUri: ''
      });
      await quote.save();
    }
    console.log('Invoices and quotes created.');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
}

seedData();

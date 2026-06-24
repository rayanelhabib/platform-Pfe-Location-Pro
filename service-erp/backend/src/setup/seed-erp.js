require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const Client = require('../models/appModels/Client');
const Invoice = require('../models/appModels/Invoice');
const Quote = require('../models/appModels/Quote');
const Admin = require('../models/coreModels/Admin');

const CARS = [
  'Renault Clio', 'Peugeot 208', 'Dacia Sandero', 'Citroën C3',
  'Volkswagen Golf', 'Toyota Yaris', 'Renault Captur', 'Peugeot 2008',
  'Dacia Duster', 'Tesla Model 3'
];

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to MongoDB!");

    const admin = await Admin.findOne();
    if (!admin) {
      console.log("No admin found. Run setup first.");
      process.exit(1);
    }

    console.log("Creating 20 Clients...");
    const clients = [];
    for (let i = 1; i <= 20; i++) {
      const client = new Client({
        name: `Client Location ${i}`,
        email: `client${i}@example.com`,
        phone: `+212 600 000 ${i.toString().padStart(2, '0')}`,
        country: 'Morocco',
        address: `Casablanca, Rue ${i}`,
        createdBy: admin._id
      });
      await client.save();
      clients.push(client);
    }
    console.log("Clients created.");

    console.log("Creating 20 Quotes and Invoices...");
    for (let i = 1; i <= 20; i++) {
      const car = CARS[i % CARS.length];
      const duration = (i % 7) + 1;
      const pricePerDay = 300 + (i * 10);
      const subTotal = duration * pricePerDay;
      const taxTotal = subTotal * 0.20;
      const total = subTotal + taxTotal;

      const items = [{
        itemName: `Location ${car} - ${duration} jours`,
        description: `Location de voiture pour ${duration} jours`,
        quantity: duration,
        price: pricePerDay,
        total: subTotal
      }];

      // Create Quote
      const quote = new Quote({
        createdBy: admin._id,
        number: 1000 + i,
        year: 2026,
        date: new Date(),
        expiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        client: clients[i - 1]._id,
        items,
        taxRate: 20,
        subTotal,
        taxTotal,
        total,
        currency: 'MAD',
        status: i % 2 === 0 ? 'accepted' : 'pending'
      });
      await quote.save();

      // Create Invoice
      const invoice = new Invoice({
        createdBy: admin._id,
        number: 2000 + i,
        year: 2026,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        client: clients[i - 1]._id,
        items,
        taxRate: 20,
        subTotal,
        taxTotal,
        total,
        currency: 'MAD',
        paymentStatus: i % 3 === 0 ? 'paid' : 'unpaid',
        status: 'sent'
      });
      await invoice.save();
    }

    console.log("Fake data created successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

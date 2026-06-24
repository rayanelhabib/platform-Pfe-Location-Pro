require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

async function updateCompanyName() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to MongoDB!");

    const Setting = require('./src/models/coreModels/Setting');
    
    // Update company_name
    await Setting.findOneAndUpdate(
      { settingKey: 'company_name' },
      { settingValue: 'Prestige Maroc' },
      { upsert: true }
    );

    console.log("Company name updated to Prestige Maroc!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateCompanyName();

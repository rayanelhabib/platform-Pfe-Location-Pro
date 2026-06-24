import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.BC_DB_URI || "mongodb+srv://rayan:rayan123@locengin.poca78u.mongodb.net/bookcars?appName=Locengin";

async function addCarsToLocs() {
  await mongoose.connect(DB_URI);
  
  const LocationValue = mongoose.model('LocationValue', new mongoose.Schema({}, { strict: false, collection: 'LocationValue' }));
  const Location = mongoose.model('Location', new mongoose.Schema({ values: [mongoose.Schema.Types.ObjectId] }, { strict: false, collection: 'Location' }));
  const Car = mongoose.model('Car', new mongoose.Schema({ locations: [mongoose.Schema.Types.ObjectId] }, { strict: false, collection: 'Car' }));

  const maarifVal = await LocationValue.findOne({ value: 'Maarif, Casablanca' });
  const zerktouniVal = await LocationValue.findOne({ value: 'Zerktouni, Casablanca' });

  if (maarifVal && zerktouniVal) {
    const locMaarif = await Location.findOne({ values: maarifVal._id });
    const locZerktouni = await Location.findOne({ values: zerktouniVal._id });

    // Find some cars in Casablanca to add to Maarif and Zerktouni
    const cars = await Car.find();
    
    // Assign 3 cars to Maarif
    await Car.updateOne({ _id: cars[0]._id }, { $push: { locations: locMaarif._id } });
    await Car.updateOne({ _id: cars[1]._id }, { $push: { locations: locMaarif._id } });
    await Car.updateOne({ _id: cars[2]._id }, { $push: { locations: locMaarif._id } });
    
    // Assign 3 cars to Zerktouni
    await Car.updateOne({ _id: cars[3]._id }, { $push: { locations: locZerktouni._id } });
    await Car.updateOne({ _id: cars[4]._id }, { $push: { locations: locZerktouni._id } });
    await Car.updateOne({ _id: cars[5]._id }, { $push: { locations: locZerktouni._id } });

    console.log("Cars assigned to new locations.");
  } else {
    console.log("Could not find locations");
  }
  
  process.exit(0);
}
addCarsToLocs();

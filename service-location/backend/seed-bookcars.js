import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

dotenv.config();

const DB_URI = process.env.BC_DB_URI || "mongodb://127.0.0.1:27017/bookcars";

const UserSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  password: String,
  language: String,
  type: String,
  active: Boolean,
  verified: Boolean,
  avatar: String,
  phone: String,
  location: String,
  bio: String,
  payLater: Boolean,
}, { timestamps: true, strict: false, collection: 'User' });

const CountrySchema = new mongoose.Schema({
  values: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true, strict: false, collection: 'Country' });

const LocationValueSchema = new mongoose.Schema({
  language: String,
  value: String,
}, { timestamps: true, strict: false, collection: 'LocationValue' });

const LocationSchema = new mongoose.Schema({
  country: mongoose.Schema.Types.ObjectId,
  values: [mongoose.Schema.Types.ObjectId],
  latitude: Number,
  longitude: Number,
}, { timestamps: true, strict: false, collection: 'Location' });

const CarSchema = new mongoose.Schema({
  name: String,
  supplier: mongoose.Schema.Types.ObjectId,
  minimumAge: Number,
  locations: [mongoose.Schema.Types.ObjectId],
  dailyPrice: Number,
  deposit: Number,
  available: Boolean,
  type: String,
  gearbox: String,
  aircon: Boolean,
  image: String,
  seats: Number,
  doors: Number,
  fuelPolicy: String,
  mileage: Number,
  cancellation: Number,
  amendments: Number,
  theftProtection: Number,
  collisionDamageWaiver: Number,
  fullInsurance: Number,
  additionalDriver: Number,
  range: String,
  multimedia: [String],
  rating: Number,
  trips: Number,
  co2: Number,
}, { timestamps: true, strict: false, collection: 'Car' });

const BookingSchema = new mongoose.Schema({
  supplier: mongoose.Schema.Types.ObjectId,
  car: mongoose.Schema.Types.ObjectId,
  driver: mongoose.Schema.Types.ObjectId,
  pickupLocation: mongoose.Schema.Types.ObjectId,
  dropOffLocation: mongoose.Schema.Types.ObjectId,
  from: Date,
  to: Date,
  status: String,
  cancellation: Boolean,
  amendments: Boolean,
  theftProtection: Boolean,
  collisionDamageWaiver: Boolean,
  fullInsurance: Boolean,
  additionalDriver: Boolean,
  price: Number,
}, { timestamps: true, strict: false, collection: 'Booking' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Country = mongoose.models.Country || mongoose.model('Country', CountrySchema);
const LocationValue = mongoose.models.LocationValue || mongoose.model('LocationValue', LocationValueSchema);
const Location = mongoose.models.Location || mongoose.model('Location', LocationSchema);
const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

async function seed() {
  console.log("Connecting to DB:", DB_URI);
  await mongoose.connect(DB_URI);
  
  console.log("Connected. Clearing DB...");
  await User.deleteMany({ email: { $ne: 'admin@bookcars.ma' } });
  await Country.deleteMany({});
  await LocationValue.deleteMany({});
  await Location.deleteMany({});
  await Car.deleteMany({});
  await Booking.deleteMany({});

  console.log("1. Creating Users (Suppliers & Clients)...");
  const passwordHash = await hashPassword('B00kC4r5'); // Default password for everyone
  
  const supplier1 = await User.create({ email: 'contact@prestigemaroc.ma', fullName: 'Prestige Maroc', password: passwordHash, language: 'fr', type: 'supplier', active: true, verified: true, payLater: true, location: 'Casablanca, Maroc', phone: '+212600112233', bio: 'Agence de location Premium', avatar: 'prestige.png' });
  const supplier2 = await User.create({ email: 'resa@maroccars.ma', fullName: 'MarocCars Auto', password: passwordHash, language: 'fr', type: 'supplier', active: true, verified: true, payLater: true, location: 'Marrakech, Maroc', phone: '+212600445566', bio: 'Votre partenaire de route', avatar: 'maroc.png' });
  const supplier3 = await User.create({ email: 'info@cityrent.ma', fullName: 'CityRent Tanger', password: passwordHash, language: 'fr', type: 'supplier', active: true, verified: true, payLater: true, location: 'Tanger, Maroc', phone: '+212600778899', bio: 'Location rapide et pas cher', avatar: 'maroc.png' });

  const clients = await Promise.all([
    User.create({ email: 'ahmed.alaoui@gmail.com', fullName: 'Ahmed Alaoui', password: passwordHash, language: 'fr', type: 'user', active: true, verified: true }),
    User.create({ email: 'sara.idrissi@gmail.com', fullName: 'Sara Idrissi', password: passwordHash, language: 'fr', type: 'user', active: true, verified: true }),
    User.create({ email: 'karim.benjelloun@yahoo.fr', fullName: 'Karim Benjelloun', password: passwordHash, language: 'fr', type: 'user', active: true, verified: true }),
    User.create({ email: 'youssef.tazi@hotmail.com', fullName: 'Youssef Tazi', password: passwordHash, language: 'fr', type: 'user', active: true, verified: true }),
    User.create({ email: 'meryem.chraibi@gmail.com', fullName: 'Meryem Chraibi', password: passwordHash, language: 'fr', type: 'user', active: true, verified: true })
  ]);

  console.log("2. Creating Countries & Locations...");
  const countryValFr = await LocationValue.create({ language: 'fr', value: 'Maroc' });
  const countryValEn = await LocationValue.create({ language: 'en', value: 'Morocco' });
  const country = await Country.create({ values: [countryValFr._id, countryValEn._id] });

  const locsData = [
    { fr: 'Aéroport Mohammed V, Casablanca', en: 'Mohammed V Airport, Casablanca', lat: 33.3675, lng: -7.5898 },
    { fr: 'Casablanca Centre Ville', en: 'Casablanca City Center', lat: 33.5898, lng: -7.6038 },
    { fr: 'Aéroport Menara, Marrakech', en: 'Menara Airport, Marrakech', lat: 31.6069, lng: -8.0363 },
    { fr: 'Marrakech Guéliz', en: 'Marrakech Gueliz', lat: 31.6315, lng: -8.0083 },
    { fr: 'Aéroport Rabat-Salé', en: 'Rabat-Sale Airport', lat: 34.0515, lng: -6.7515 },
    { fr: 'Rabat Agdal', en: 'Rabat Agdal', lat: 33.9989, lng: -6.8523 },
    { fr: 'Aéroport Ibn Battouta, Tanger', en: 'Ibn Battouta Airport, Tangier', lat: 35.7269, lng: -5.9168 },
    { fr: 'Aéroport Al Massira, Agadir', en: 'Al Massira Airport, Agadir', lat: 30.3250, lng: -9.4131 }
  ];

  const dbLocations = [];
  for (const l of locsData) {
    const valFr = await LocationValue.create({ language: 'fr', value: l.fr });
    const valEn = await LocationValue.create({ language: 'en', value: l.en });
    const loc = await Location.create({ country: country._id, values: [valFr._id, valEn._id], latitude: l.lat, longitude: l.lng });
    dbLocations.push(loc);
  }

  const [locCasaAir, locCasaVille, locKechaAir, locKechaGueliz, locRabatAir, locRabatAgdal, locTanger, locAgadir] = dbLocations;

  console.log("3. Creating Cars...");
  const carsData = [
    // Prestige Maroc Fleet
    { name: 'Range Rover Evoque', sup: supplier1, type: 'diesel', gear: 'automatic', range: 'maxi', price: 1200, dep: 15000, seats: 5, doors: 5, locs: [locCasaAir, locKechaAir, locRabatAir], image: 'range-rover.jpg' },
    { name: 'Mercedes Classe C', sup: supplier1, type: 'diesel', gear: 'automatic', range: 'maxi', price: 950, dep: 10000, seats: 5, doors: 4, locs: [locCasaAir, locCasaVille], image: 'mercedes.jpg' },
    { name: 'Peugeot 208', sup: supplier1, type: 'gasoline', gear: 'manual', range: 'midi', price: 300, dep: 4000, seats: 5, doors: 5, locs: [locCasaAir, locRabatAgdal, locKechaGueliz], image: 'peugeot.jpg' },
    { name: 'Hyundai Tucson', sup: supplier1, type: 'diesel', gear: 'automatic', range: 'maxi', price: 700, dep: 8000, seats: 5, doors: 5, locs: [locKechaAir, locAgadir], image: 'suv.jpg' },
    
    // MarocCars Auto Fleet
    { name: 'Dacia Logan', sup: supplier2, type: 'diesel', gear: 'manual', range: 'mini', price: 250, dep: 3000, seats: 5, doors: 4, locs: [locKechaAir, locKechaGueliz, locCasaAir], image: 'peugeot.jpg' },
    { name: 'Renault Clio 5', sup: supplier2, type: 'gasoline', gear: 'manual', range: 'midi', price: 280, dep: 3500, seats: 5, doors: 5, locs: [locKechaAir, locAgadir], image: 'peugeot.jpg' },
    { name: 'Dacia Duster', sup: supplier2, type: 'diesel', gear: 'manual', range: 'midi', price: 400, dep: 5000, seats: 5, doors: 5, locs: [locKechaAir, locAgadir, locCasaVille], image: 'suv.jpg' },
    { name: 'Volkswagen Golf 8', sup: supplier2, type: 'diesel', gear: 'automatic', range: 'midi', price: 600, dep: 7000, seats: 5, doors: 5, locs: [locKechaGueliz], image: 'peugeot.jpg' },

    // CityRent Tanger Fleet
    { name: 'Kia Picanto', sup: supplier3, type: 'gasoline', gear: 'automatic', range: 'mini', price: 200, dep: 2500, seats: 4, doors: 5, locs: [locTanger, locRabatAir], image: 'peugeot.jpg' },
    { name: 'Fiat 500', sup: supplier3, type: 'gasoline', gear: 'manual', range: 'mini', price: 220, dep: 3000, seats: 4, doors: 3, locs: [locTanger], image: 'peugeot.jpg' },
    { name: 'Jeep Renegade', sup: supplier3, type: 'diesel', gear: 'automatic', range: 'maxi', price: 550, dep: 6000, seats: 5, doors: 5, locs: [locTanger], image: 'suv.jpg' },
    { name: 'Toyota Yaris Hybrid', sup: supplier3, type: 'hybrid', gear: 'automatic', range: 'midi', price: 350, dep: 4500, seats: 5, doors: 5, locs: [locTanger, locRabatAgdal], image: 'peugeot.jpg' },
  ];

  const dbCars = [];
  for (const c of carsData) {
    const car = await Car.create({
      name: c.name,
      supplier: c.sup._id,
      minimumAge: c.range === 'maxi' ? 25 : 21,
      locations: c.locs.map(l => l._id),
      dailyPrice: c.price,
      deposit: c.dep,
      available: true,
      type: c.type,
      gearbox: c.gear,
      aircon: true,
      image: c.image,
      seats: c.seats,
      doors: c.doors,
      fuelPolicy: 'likeForlike',
      mileage: -1,
      cancellation: 0,
      amendments: 0,
      theftProtection: 90,
      collisionDamageWaiver: 120,
      fullInsurance: 200,
      additionalDriver: 50,
      range: c.range,
      multimedia: ['bluetooth', 'touchscreen'],
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
      trips: Math.floor(Math.random() * 50) + 5,
    });
    dbCars.push(car);
  }

  console.log("4. Creating Bookings...");
  const today = new Date();
  
  // Create 15 random bookings
  for (let i = 0; i < 15; i++) {
    const car = dbCars[Math.floor(Math.random() * dbCars.length)];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const pickupLoc = car.locations[0];
    const dropoffLoc = car.locations[Math.floor(Math.random() * car.locations.length)];
    
    // Random dates (some in past, some in future)
    const offset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days
    const duration = Math.floor(Math.random() * 10) + 2; // 2 to 11 days
    
    const from = new Date(today);
    from.setDate(today.getDate() + offset);
    
    const to = new Date(from);
    to.setDate(from.getDate() + duration);

    let status = 'paid';
    if (to < today) status = 'paid';
    else if (from > today && offset > 20) status = 'pending';
    else if (from > today && offset < 5) status = 'cancelled';

    await Booking.create({
      supplier: car.supplier,
      car: car._id,
      driver: client._id,
      pickupLocation: pickupLoc,
      dropOffLocation: dropoffLoc,
      from: from,
      to: to,
      status: status,
      cancellation: false,
      amendments: false,
      theftProtection: false,
      collisionDamageWaiver: false,
      fullInsurance: true,
      additionalDriver: false,
      price: car.dailyPrice * duration
    });
  }

  console.log("=========================================");
  console.log("🎉 Seeding BookCars PRO Complete!");
  console.log(`- ${dbLocations.length} Locations created (Maroc)`);
  console.log(`- 3 Suppliers (Prestige Maroc, MarocCars, CityRent)`);
  console.log(`- 5 Clients`);
  console.log(`- ${dbCars.length} Cars in fleet`);
  console.log(`- 15 Bookings generated`);
  console.log("=========================================");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

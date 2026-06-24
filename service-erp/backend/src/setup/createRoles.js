require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { generate: uniqueId } = require('shortid');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

async function setupRoles() {
  try {
    const Admin = require('../models/coreModels/Admin');
    const AdminPassword = require('../models/coreModels/AdminPassword');
    
    const rolesToCreate = [
      {
        email: 'manager@prestige.com',
        name: 'John',
        surname: 'Manager',
        role: 'manager'
      },
      {
        email: 'sales@prestige.com',
        name: 'Sarah',
        surname: 'Sales',
        role: 'sales'
      },
      {
        email: 'accountant@prestige.com',
        name: 'Marc',
        surname: 'Accountant',
        role: 'accountant'
      }
    ];

    for (const roleData of rolesToCreate) {
      // Check if user exists
      const exists = await Admin.findOne({ email: roleData.email });
      if (exists) {
        console.log(`User ${roleData.email} already exists.`);
        continue;
      }

      const demoAdmin = {
        email: roleData.email,
        name: roleData.name,
        surname: roleData.surname,
        enabled: true,
        role: roleData.role,
      };

      const result = await new Admin(demoAdmin).save();

      const newAdminPassword = new AdminPassword();
      const salt = uniqueId();
      const passwordHash = newAdminPassword.generateHash(salt, 'admin123');

      const AdminPasswordData = {
        password: passwordHash,
        emailVerified: true,
        salt: salt,
        user: result._id,
      };
      await new AdminPassword(AdminPasswordData).save();
      console.log(`👍 ${roleData.role} created : Done! (${roleData.email} / admin123)`);
    }

    console.log('🥳 Setup completed :Success!');
    process.exit(0);
  } catch (e) {
    console.log('\n🚫 Error! The Error info is below');
    console.log(e);
    process.exit(1);
  }
}

setupRoles();

const { Client } = require('pg');

async function makeRealistic() {
  const c = new Client({connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/default'});
  await c.connect();
  const schemas = await c.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'workspace_%'`);
  
  for (let s of schemas.rows) {
    const sc = s.schema_name;
    
    // 1. UPDATE PERSONS
    const personsData = [
      { f: 'Amine', l: 'Benjelloun', job: 'Directeur Achats', email: 'a.benjelloun@hotelatlas.ma', phone: '661111111', linkedin: 'https://linkedin.com/in/amine-benjelloun' },
      { f: 'Youssef', l: 'El Fassi', job: 'Gérant', email: 'y.elfassi@voyagesud-maroc.ma', phone: '662222222', linkedin: 'https://linkedin.com/in/youssef-elfassi' },
      { f: 'Fatima', l: 'Zahra', job: 'Responsable Logistique', email: 'f.zahra@casaconnect.ma', phone: '663333333', linkedin: 'https://linkedin.com/in/fatima-zahra' },
      { f: 'Mehdi', l: 'Chraibi', job: 'Chef de Chantier', email: 'm.chraibi@batimaroc.co.ma', phone: '664444444', linkedin: 'https://linkedin.com/in/mehdi-chraibi' },
      { f: 'Karim', l: 'Tazi', job: 'Directeur Général', email: 'k.tazi@consulting-ma.com', phone: '665555555', linkedin: 'https://linkedin.com/in/karim-tazi' }
    ];

    const persons = await c.query(`SELECT id FROM "${sc}"."person" LIMIT 5`);
    for (let i = 0; i < persons.rows.length; i++) {
      const row = persons.rows[i];
      const p = personsData[i];
      if (p) {
        try {
          await c.query(`
            UPDATE "${sc}"."person" 
            SET 
              "nameFirstName" = $1, 
              "nameLastName" = $2,
              "jobTitle" = $3, 
              "emailsPrimaryEmail" = $4,
              "phonesPrimaryPhoneNumber" = $5,
              "phonesPrimaryPhoneCountryCode" = 'MA',
              "phonesPrimaryPhoneCallingCode" = '+212',
              "linkedinLinkPrimaryLinkUrl" = $6,
              "linkedinLinkPrimaryLinkLabel" = $6,
              "createdByName" = 'Admin Prestige',
              "updatedByName" = 'Admin Prestige'
            WHERE id = $7
          `, [p.f, p.l, p.job, p.email, p.phone, p.linkedin, row.id]);
        } catch(e) {}
      }
    }

    // Scrub other persons
    try {
      await c.query(`
        UPDATE "${sc}"."person"
        SET 
          "emailsPrimaryEmail" = 'contact-' || id || '@client.ma',
          "phonesPrimaryPhoneNumber" = '600000000',
          "phonesPrimaryPhoneCountryCode" = 'MA',
          "phonesPrimaryPhoneCallingCode" = '+212',
          "linkedinLinkPrimaryLinkUrl" = '',
          "linkedinLinkPrimaryLinkLabel" = '',
          "jobTitle" = 'Employé',
          "createdByName" = 'Admin Prestige',
          "updatedByName" = 'Admin Prestige'
        WHERE id NOT IN (${persons.rows.map(r => `'${r.id}'`).join(', ') || "''"})
      `);
    } catch(e) {}

    // 2. SCRUB MESSAGES (Emails in timeline)
    try {
      await c.query(`
        UPDATE "${sc}"."message"
        SET 
          "subject" = 'Suivi de contrat de location Prestige Maroc',
          "text" = 'Bonjour, veuillez trouver ci-joint les détails de notre proposition de flotte automobile.'
      `);
    } catch(e) {}

    // 3. SCRUB CALENDAR EVENTS
    try {
      await c.query(`
        UPDATE "${sc}"."calendarEvent"
        SET 
          "title" = 'Réunion Commerciale - Renouvellement Flotte',
          "description" = 'Discussion autour des conditions tarifaires pour les SUV.'
      `);
    } catch(e) {}

  }
  await c.end();
  console.log("Deep Realistic update finished.");
}
makeRealistic();

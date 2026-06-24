const { Client } = require('pg');

async function scrubDetails() {
  const c = new Client({connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/default'});
  await c.connect();
  const schemas = await c.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'workspace_%'`);
  
  for (let s of schemas.rows) {
    const sc = s.schema_name;
    
    // First, update the 5 realistic companies with full details
    const companies = [
      {
        name: 'Hôtel Atlas Casablanca',
        domain: 'hotelatlas.ma',
        linkedin: 'https://linkedin.com/company/hotel-atlas-casablanca',
        tagline: 'L excellence de l hôtellerie marocaine au cœur de Casablanca.',
        city: 'Casablanca',
        street: 'Boulevard Anfa'
      },
      {
        name: 'Agence de Voyage Sud',
        domain: 'voyagesud-maroc.ma',
        linkedin: 'https://linkedin.com/company/voyage-sud-maroc',
        tagline: 'Spécialiste des circuits touristiques dans le sud du Maroc.',
        city: 'Marrakech',
        street: 'Avenue Hassan II'
      },
      {
        name: 'Centre Appel CasaConnect',
        domain: 'casaconnect.ma',
        linkedin: 'https://linkedin.com/company/casaconnect',
        tagline: 'Leader de l externalisation de la relation client au Maroc.',
        city: 'Casablanca',
        street: 'Sidi Maarouf'
      },
      {
        name: 'Entreprise BTP BatiMaroc',
        domain: 'batimaroc.co.ma',
        linkedin: 'https://linkedin.com/company/batimaroc',
        tagline: 'Construction et génie civil pour les grands projets.',
        city: 'Rabat',
        street: 'Hay Riad'
      },
      {
        name: 'Consulting SARL',
        domain: 'consulting-ma.com',
        linkedin: 'https://linkedin.com/company/consulting-sarl-maroc',
        tagline: 'Cabinet de conseil en stratégie et management.',
        city: 'Casablanca',
        street: 'Maarif'
      }
    ];

    for (let comp of companies) {
      await c.query(`
        UPDATE "${sc}"."company" 
        SET 
          "linkedinLinkPrimaryLinkUrl" = $1, 
          "tagline" = $2, 
          "domainNamePrimaryLinkUrl" = $3,
          "domainNamePrimaryLinkLabel" = $3,
          "addressAddressCity" = $4,
          "addressAddressStreet1" = $5,
          "addressAddressCountry" = 'MA',
          "createdByName" = 'Admin Prestige',
          "updatedByName" = 'Admin Prestige'
        WHERE name = $6
      `, [comp.linkedin, comp.tagline, comp.domain, comp.city, comp.street, comp.name]);
    }

    // Now scrub the rest with unique values
    await c.query(`
      UPDATE "${sc}"."company"
      SET 
        "linkedinLinkPrimaryLinkUrl" = 'https://linkedin.com/company/client-' || id,
        "linkedinLinkPrimaryLinkLabel" = '',
        "tagline" = 'Client B2B Location',
        "domainNamePrimaryLinkUrl" = 'client-' || id || '.ma',
        "domainNamePrimaryLinkLabel" = 'client-' || id || '.ma',
        "addressAddressCity" = 'Casablanca',
        "addressAddressCountry" = 'MA',
        "createdByName" = 'Admin Prestige',
        "updatedByName" = 'Admin Prestige'
      WHERE name NOT IN ('Hôtel Atlas Casablanca', 'Agence de Voyage Sud', 'Centre Appel CasaConnect', 'Entreprise BTP BatiMaroc', 'Consulting SARL')
    `);

  }
  await c.end();
  console.log("Scrubbed all remaining Google/Microsoft details.");
}
scrubDetails();

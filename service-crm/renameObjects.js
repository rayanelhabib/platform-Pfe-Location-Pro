const { Client } = require('pg');

async function renameCustomObjects() {
  const c = new Client({connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/default'});
  await c.connect();

  try {
    // 1. Rename Metadata Labels
    await c.query(`UPDATE "core"."objectMetadata" SET "labelPlural" = 'Véhicules', "labelSingular" = 'Véhicule', "icon" = 'IconCar' WHERE "namePlural" = 'pets'`);
    await c.query(`UPDATE "core"."objectMetadata" SET "labelPlural" = 'Contrats Assurance', "labelSingular" = 'Contrat Assurance', "icon" = 'IconShield' WHERE "namePlural" = 'petCareAgreements'`);
    await c.query(`UPDATE "core"."objectMetadata" SET "labelPlural" = 'Enquêtes Satisfaction', "labelSingular" = 'Enquête Satisfaction', "icon" = 'IconStar' WHERE "namePlural" = 'surveyResults'`);
    await c.query(`UPDATE "core"."objectMetadata" SET "labelPlural" = 'Historique Conducteurs', "labelSingular" = 'Historique Conducteur', "icon" = 'IconSteeringWheel' WHERE "namePlural" = 'employmentHistories'`);
    await c.query(`UPDATE "core"."objectMetadata" SET "labelPlural" = 'Succursales', "labelSingular" = 'Succursale', "icon" = 'IconBuilding' WHERE "namePlural" = 'rockets'`);

    // 2. Truncate the fake data in workspace schemas
    const schemas = await c.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'workspace_%'`);
    for (let s of schemas.rows) {
      const sc = s.schema_name;
      try { await c.query(`TRUNCATE TABLE "${sc}"."_pet" CASCADE`); } catch(e) {}
      try { await c.query(`TRUNCATE TABLE "${sc}"."_petCareAgreement" CASCADE`); } catch(e) {}
      try { await c.query(`TRUNCATE TABLE "${sc}"."_surveyResult" CASCADE`); } catch(e) {}
      try { await c.query(`TRUNCATE TABLE "${sc}"."_employmentHistory" CASCADE`); } catch(e) {}
      try { await c.query(`TRUNCATE TABLE "${sc}"."_rocket" CASCADE`); } catch(e) {}
    }
    
    console.log("Successfully renamed custom objects and truncated fake data!");
  } catch(e) {
    console.log("Error:", e.message);
  }
  await c.end();
}
renameCustomObjects();

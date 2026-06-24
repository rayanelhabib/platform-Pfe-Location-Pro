const { Client } = require('pg');

async function fixData() {
  const client = new Client({
    connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/default'
  });

  try {
    await client.connect();
    
    // Check schemas
    const schemaRes = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog') 
      AND schema_name NOT LIKE 'pg_toast%';
    `);
    
    for (const schema of schemaRes.rows) {
      if (schema.schema_name.startsWith('workspace_')) {
        const s = schema.schema_name;
        
        // Update Companies
        await client.query(`UPDATE "${s}"."company" SET name = 'Royal Air Maroc' WHERE name = 'Google'`);
        await client.query(`UPDATE "${s}"."company" SET name = 'OCP Group' WHERE name = 'Microsoft'`);
        await client.query(`UPDATE "${s}"."company" SET name = 'Maroc Telecom' WHERE name = 'Meta'`);
        await client.query(`UPDATE "${s}"."company" SET name = 'Attijariwafa Bank' WHERE name = 'SLB'`);
        await client.query(`UPDATE "${s}"."company" SET name = 'Renault Maroc' WHERE name = 'Cisco'`);

        // Get Opportunities
        const opps = await client.query(`SELECT id, name FROM "${s}"."opportunity" LIMIT 5`);
        for (let i = 0; i < opps.rows.length; i++) {
          const row = opps.rows[i];
          const newName = ['Location Flotte 10 Véhicules', 'Contrat Annuel SUV', 'Location Voitures de Fonction', 'Flotte Direction Maroc', 'Partenariat VIP'][i];
          if (newName) {
            await client.query(`UPDATE "${s}"."opportunity" SET name = $1 WHERE id = $2`, [newName, row.id]);
          }
        }
        
        // Let's just look at columns in person
        const columns = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_schema = $1 AND table_name = 'person';
        `, [s]);
        
        const cols = columns.rows.map(r => r.column_name);
        if (cols.includes('name_firstName')) {
           const persons = await client.query(`SELECT id FROM "${s}"."person" LIMIT 5`);
           for (let i = 0; i < persons.rows.length; i++) {
             const row = persons.rows[i];
             const newNames = [
               { f: 'Amine', l: 'Benjelloun' },
               { f: 'Youssef', l: 'El Fassi' },
               { f: 'Fatima', l: 'Zahra' },
               { f: 'Mehdi', l: 'Chraibi' },
               { f: 'Karim', l: 'Tazi' }
             ][i];
             if (newNames) {
                await client.query(`UPDATE "${s}"."person" SET "name_firstName" = $1, "name_lastName" = $2 WHERE id = $3`, [newNames.f, newNames.l, row.id]);
             }
           }
        }
        console.log(`Updated data in schema ${s}`);
      }
    }
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
fixData();

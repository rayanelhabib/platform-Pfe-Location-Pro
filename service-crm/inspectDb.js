const { Client } = require('pg');

async function checkDb() {
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
    console.log("Schemas:", schemaRes.rows.map(r => r.schema_name));

    // Get tables from the core schema
    for (const schema of schemaRes.rows) {
      if (schema.schema_name.startsWith('workspace_')) {
        const tableRes = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = $1;
        `, [schema.schema_name]);
        console.log(`Tables in ${schema.schema_name}:`, tableRes.rows.map(r => r.table_name));
        
        // See if company exists
        const companies = await client.query(`SELECT * FROM "${schema.schema_name}"."company" LIMIT 5`);
        console.log("Companies:", companies.rows.map(r => ({ name: r.name, domainName: r.domainName })));
      }
    }
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
checkDb();

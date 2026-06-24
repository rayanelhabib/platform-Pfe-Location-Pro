const { Client } = require('pg');

async function checkMetadata() {
  const c = new Client({connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/default'});
  await c.connect();
  try {
    const res = await c.query(`SELECT "id", "namePlural", "labelPlural", "labelSingular", "icon" FROM "core"."objectMetadata" WHERE "isSystem" = false`);
    console.log("Custom Objects:", res.rows);
  } catch(e) {
    console.log("Error querying objectMetadata:", e.message);
  }
  await c.end();
}
checkMetadata();

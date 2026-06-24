const fs = require('fs');

const replace = (f) => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/}\s*\]/g, "},\n    { code: 'MAD', symbol: 'MAD' }\n  ]");
  fs.writeFileSync(f, content);
};

replace('frontend/src/config/env.config.ts');
replace('admin/src/config/env.config.ts');

console.log("MAD added to configs");

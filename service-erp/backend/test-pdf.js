const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent('<h1>Test PDF Generation</h1><p>If you see this, Puppeteer works perfectly!</p>', { waitUntil: 'networkidle0' });
    await page.pdf({
      path: 'test-puppeteer.pdf',
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });
    await browser.close();
    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Puppeteer Error:", error);
  }
})();

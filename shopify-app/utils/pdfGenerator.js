const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core'); // 

const generatePDF = async (pages, title = 'Bilderbuch') => {
  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; }
          .page {
            page-break-after: always;
            margin-bottom: 60px;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .text {
            font-size: 18px;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${pages.map(p => `
          <div class="page">
            ${p.cartoonImage ? `<img src="${p.cartoonImage}" />` : ''}
            <div class="text">${p.text}</div>
          </div>
        `).join('')}
      </body>
    </html>
  `;

  const timestamp = Date.now();
  const filename = `${title.replace(/\s+/g, '_')}_${timestamp}.pdf`;
  const outputPath = path.resolve(__dirname, `../../output/${filename}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
  });

  await browser.close();

  return outputPath;
};

module.exports = { generatePDF };

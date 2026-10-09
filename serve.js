// Hardus Plumbing - Lightweight Local Preview Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let rawUrl = req.url.split('?')[0];

  // 301 Redirect legacy /states/[state]/[city]/ to /[state]/[city]/
  if (rawUrl.startsWith('/states/') && rawUrl !== '/states/' && rawUrl !== '/states/index.html') {
    const newPath = rawUrl.replace(/^\/states\//, '/');
    res.writeHead(301, { 'Location': newPath });
    res.end();
    return;
  }

  let parsedUrl = rawUrl;
  if (parsedUrl.endsWith('/')) {
    parsedUrl += 'index.html';
  }

  let filePath = path.join(DIST_DIR, parsedUrl);

  // If path doesn't have an extension and directory exists, try index.html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p><p><a href="/">Return to Home</a></p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Hardus Plumbing preview server running at http://localhost:${PORT}/`);
});

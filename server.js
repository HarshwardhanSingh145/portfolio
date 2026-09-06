const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8'
};

const ROUTE_MAP = {
  '/': 'index.html',
  '/design': 'design.html',
  '/photos': 'design.html',
  '/look-book': 'design.html',
  '/about': 'design.html',
  '/contact': 'contact.html'
};

function fetchAndCache(remoteUrl, localPath, res) {
  https.get(remoteUrl, (remoteRes) => {
    if (remoteRes.statusCode === 200) {
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      const fileStream = fs.createWriteStream(localPath);
      remoteRes.pipe(fileStream);
      
      const ext = path.extname(localPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || remoteRes.headers['content-type'] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      remoteRes.pipe(res);
    } else {
      res.writeHead(remoteRes.statusCode || 404);
      res.end('Not found remotely');
    }
  }).on('error', (err) => {
    res.writeHead(502);
    res.end('Remote fetch error: ' + err.message);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Check route map first
  if (ROUTE_MAP[pathname]) {
    pathname = '/' + ROUTE_MAP[pathname];
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

  // Check if directory
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file exists, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isHtml = ext === '.html';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': isHtml ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback for CDN assets if missing locally
  if (pathname.startsWith('/cdn.prod.website-files.com/') || pathname.startsWith('/framerusercontent.com/')) {
    const remoteUrl = 'https:/' + pathname;
    fetchAndCache(remoteUrl, filePath, res);
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found: ' + pathname);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

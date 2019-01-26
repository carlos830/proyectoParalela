const http = require('http');
const app = require('../app.js');

const port = parseInt(process.debugPort.port, 10) || 8020;

app.set('port', port);

const server = http.createServer(app);
server.listen(port, '0.0.0.0');
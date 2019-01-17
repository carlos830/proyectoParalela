const http = require('http');
const app = require('../app.js');

const port = parseInt(process.debugPort.port, 10) || 8010;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
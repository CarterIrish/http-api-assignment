const http = require('http');
const fs = require('fs');
const responses = require('./responses.js')

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(client);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};

const urlStruct = {
    '/': getIndex,
    '/style.css': getCSS,
    '/success': responses.success,
    '/badRequest': responses.badRequest,
    '/unauthorized': responses.unauthorized,
    '/forbidden': responses.forbidden,
    '/internal': responses.internal,
    '/notImplemented': responses.notImplemented,
    '/notFound': responses.notFound
};

const onRequest = (request, response) => {
    const parsedURL = new URL(request.url, `http://${request.headers.host}`);
    const handler = urlStruct[parsedURL.pathname] || responses.notFound;
    handler(request, response);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port ${port}`);
});


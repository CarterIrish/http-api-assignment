const RESPONSE_CODES =
{
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    internalError: 500,
    notImplemented: 501,
    notFound: 404
};

Object.freeze(RESPONSE_CODES);

const success = (request, response) => {
    const acceptedTypes = request.headers.accept;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = '<response><message>This is a successful response.</message></response>'
        response.writeHead(RESPONSE_CODES.success, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = {
            message: 'This is a successful response.'
        }
        response.writeHead(RESPONSE_CODES.success, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}

const badRequest = (request, response) => {
    const acceptedTypes = request.headers.accept;
    const parsedURL = new URL(request.url, `http://${request.headers.host}`);
    const valid = parsedURL.searchParams.get('valid');

    const code = valid === 'true' ? RESPONSE_CODES.success : RESPONSE_CODES.badRequest;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = valid === 'true'
            ? '<response><message>This request has the required parameters.</message></response>'
            : '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
        response.writeHead(code, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = valid === 'true'
            ? { message: 'This request has the required parameters.' }
            : { message: 'Missing valid query parameter set to true.', id: 'badRequest' };
        response.writeHead(code, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}

const unauthorized = (request, response) => {
    const acceptedTypes = request.headers.accept;
    const parsedURL = new URL(request.url, `http://${request.headers.host}`);
    const loggedIn = parsedURL.searchParams.get('loggedIn');

    const responseCode = loggedIn === 'yes' ? RESPONSE_CODES.success : RESPONSE_CODES.unauthorized;

    if (acceptedTypes.includes('text/xml')) {
        const responseXML = loggedIn === 'yes'
            ? '<response><message>This request had the required parameters.</message></response>'
            : '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
        response.writeHead(responseCode, {'Content-Type': 'text/xml'});
        response.write(responseXML);
        response.end();
    }
    else
    {
        const responseJSON = loggedIn === 'yes'
        ? {message: 'This request had the required parameters.'}
        : {message: 'Missing loggedIn query parameter set to yes.', id:'unauthorized'};

        response.writeHead(responseCode, {'Content-Type':"application/json"});
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}

const forbidden = (request, response) => {
    const acceptedTypes = request.headers.accept;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
        response.writeHead(RESPONSE_CODES.forbidden, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = {
            message: 'You do not have access to this content.',
            id: 'forbidden'
        };
        response.writeHead(RESPONSE_CODES.forbidden, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}

const internal = (request, response) => {
    const acceptedTypes = request.headers.accept;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
        response.writeHead(RESPONSE_CODES.internalError, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = {
            message: 'Internal Server Error. Something went wrong.',
            id: 'internalError'
        };
        response.writeHead(RESPONSE_CODES.internalError, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}

const notImplemented = (request, response) => {
    const acceptedTypes = request.headers.accept;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
        response.writeHead(RESPONSE_CODES.notImplemented, { 'Content-Type': 'text/xml' });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = {
            message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
            id: 'notImplemented'
        };
        response.writeHead(RESPONSE_CODES.notImplemented, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}


const notFound = (request, response) => {
    const acceptedTypes = request.headers.accept;
    if (acceptedTypes.includes('text/xml')) {
        const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
        response.writeHead(RESPONSE_CODES.notFound, { 'Content-Type': "text/xml" });
        response.write(responseXML);
        response.end();
    }
    else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
            id: 'notFound'
        };
        response.writeHead(RESPONSE_CODES.notFound, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
    }
}


module.exports.notFound = notFound;
module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;

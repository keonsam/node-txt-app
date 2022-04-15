import http from 'http';
import { URL } from 'url';
import { handleFiles } from './routes/files.js';

const server = http.createServer((req, res) => {
    const { pathname, searchParams} = new URL(req.url, `http://${req.headers.host}`);
    switch(pathname) {
        case '/':
            res.statusCode = 200;
            res.end('Hello World');
            break;
        case '/files':
            return handleFiles(req, res, searchParams);
        default:
            console.log('unhandled router');
            res.statusCode = 400;
            res.end(`unhandled router ${pathname}`);
    }
});

export default server;
import http, { Server } from 'http';

export const createServer = (): Server =>
	http.createServer((req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('This is my first Lab');
	});

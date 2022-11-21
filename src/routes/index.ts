import { HttpMethodEnum } from '../lib/http-method.enum';
import Router from '../lib/router';
import send from '../lib/send';

const router = new Router();

router.get('/', (_req, res) => {
	send(res, { message: 'root' }, 'json');
});

router.add(HttpMethodEnum.GET, '/node', (_req, res) => {
	send(res, { message: 'js' }, 'json');
});

router.get('/get', (_req, res) => {
	send(res, { message: 'GET' }, 'json');
});

router.post('/post', (_req, res) => {
	send(res, { message: 'POST' }, 'json');
});

router.post('/post/xml', (_req, res) => {
	_req.on('data', (data) => {
		send(res, data, 'xml');
	});
});

export default router;

import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

import { HttpMethodEnum } from './http-method.enum';
import send from './send';

type Handler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

export default class {
	private handlers: { [path: string]: { [method: string]: Handler[] } } = {};

	async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
		const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname;
		const method = req.method || HttpMethodEnum.GET;

		const routeHandlers = this.handlers[path]?.[method];
		if (!routeHandlers || routeHandlers.length === 0) {
			send(res, 'Not found', 'json', 404);
			return;
		}

		for (const handler of await Promise.all(this.handlers[path][method])) {
			handler(req, res);
		}
	}

	add(method: HttpMethodEnum, path = '/', ...handlers: Handler[]) {
		if (!this.handlers[path]?.[method]) {
			this.handlers[path] = {
				...(this.handlers[path] || {}),
				[method]: [...handlers],
			};
		} else this.handlers[path][method].push(...handlers);
	}

	get(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.GET, path, ...handlers);
	}

	post(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.POST, path, ...handlers);
	}

	put(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.PUT, path, ...handlers);
	}

	delete(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.DELETE, path, ...handlers);
	}

	options(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.OPTIONS, path, ...handlers);
	}

	patch(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.PATCH, path, ...handlers);
	}

	trace(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.TRACE, path, ...handlers);
	}

	head(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.HEAD, path, ...handlers);
	}

	connect(path = '/', ...handlers: Handler[]) {
		this.add(HttpMethodEnum.CONNECT, path, ...handlers);
	}
}

import Server from './lib/server';
import router from './routes/index';

const PORT = parseInt(process.env.PORT || '8080');

const server = new Server();

server.use(router).listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const shutdown = async () => {
	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);
	await server.shutdown();
	process.exit(0);
};

process.on('SIGTERM', async () => {
	await shutdown();
});

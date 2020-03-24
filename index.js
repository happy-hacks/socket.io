const express = require('express');
const app = express();
const port = 4000;

const socket = require('socket.io');

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
const server = app.listen(port, () => console.log(`Server running on port ${port}!`));

const io = socket(server);

io.on('connection', (socket) => {
	console.log('made socket connection', socket.id);

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected', socket.id);
	});
});

// setInterval(() => {}, 2000);

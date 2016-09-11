const dotenv = require('dotenv');
const path = require('path');

// TODO: Add checks that environment had all required variables.
if (!dotenv.config({ path: path.join(__dirname, '../.env') })) {
	console.log('Error: .env was not found.');
}

const server = require('./server.js')();
const port = process.env.PORT || 5000;

server.set('port', port);
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = {
	development: {
		options: {
			port: 5000,
			script: 'build/server/development.js'
		}
	},
	production: {
		options: {
			script: 'build/server/production.js'
		}
	},
	developmentPublic: {
		options: {
			port: 25565,
			script: 'build/server/development.js'
		}
	}
};

module.exports = {
	developer: {
		options: {
			port: 5000,
			script: 'build/server/developer.js'
		}
	},
	production: {
		options: {
			script: 'build/server/production.js'
		}
	},
	developerPublic: {
		options: {
			port: 25565,
			script: 'build/server/developer.js'
		}
	}
};

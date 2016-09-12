module.exports = (util) => {
	const expect = util.expect;
	const request = util.request;
	const server = util.server;

	describe('Static HTML', () => {
		it('should GET "/"', (done) => {
			request(server)
				.get('/')
				.end((req, res) => {
					expect(res.status).to.be.equal(200);

					done();
				});
		});

		it('should return 404 document on GET "/NonExistant"', (done) => {
			request(server)
				.get('/NonExistant')
				.end((err, res) => {
					expect(res.status).to.be.equal(404);
					expect(res.text).to.match(/Page not found/);

					done();
				});
		});
	});
};

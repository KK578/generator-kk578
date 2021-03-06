﻿module.exports = (util) => {
	const expect = util.expect;
	const request = util.request;
	const server = util.server;

	describe('404 Stylesheet Redirection', () => {
		it('should not redirect "/stylesheets/404.css"', (done) => {
			request(server)
				.get('/stylesheets/404.css')
				.end((req, res) => {
					expect(res.status).to.not.equal(302);

					done();
				});
		});

		it('should redirect "/NonExistant/stylesheets/404.css"', (done) => {
			request(server)
				.get('/NonExistant/stylesheets/404.css')
				.end((req, res) => {
					expect(res.status).to.equal(302);
					expect(res.headers.location).to.equal('/stylesheets/404.css');

					done();
				});
		});
	});
};

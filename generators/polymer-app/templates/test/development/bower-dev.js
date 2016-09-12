module.exports = (util) => {
	const expect = util.expect;
	const request = util.request;
	const server = util.server;
	const fs = require('fs');
	const path = require('path');

	describe('Bower Development Route', () => {
		before((done) => {
			const bowerDir = path.join(__dirname, '../tmp/public/bower-components/');
			fs.stat(bowerDir, (err, stats) => {
				if (err) {
					done(err);
				}
				else {
					if (stats.isDirectory()) {
						done();
					}
					else {
						done(new Error('bower-components is not a directory.'));
					}

				}
			});
		});

		describe('Bower Test Page', () => {
			it('should GET "/bower"', (done) => {
				request(server)
					.get('/bower')
					.end((err, res) => {
						expect(res.status).to.equal(200);

						done();
					});
			});

			it('should add link for paper-fake-material on GET "scripts/bower.js"', (done) => {
				request(server)
					.get('/scripts/bower.js')
					.end((err, res) => {
						expect(res.text).to.match(/paper-fake-material/);

						done();
					});
			});

			it('should not add link for paper-no-demo on GET "scripts/bower.js"', (done) => {
				request(server)
					.get('/scripts/bower.js')
					.end((err, res) => {
						expect(res.text).to.not.match(/paper-no-demo/);

						done();
					});
			});
		});

		describe('Bower Components Passthrough', () => {
			it('should GET "/bower/paper-fake-material/"', (done) => {
				request(server)
					.get('/bower/paper-fake-material/')
					.end((err, res) => {
						expect(res.status).to.equal(200);
						expect(res.text).to.match(/Fake Paper Material Fixture/);

						done();
					});
			});

			it('should GET "/bower/paper-no-demo/paper-no-demo.html"', (done) => {
				request(server)
					.get('/bower/paper-no-demo/paper-no-demo.html')
					.end((err, res) => {
						expect(res.status).to.equal(200);
						expect(res.text).to.match(/A Somewhat Hidden File/);

						done();
					});
			});
		});
	});
};

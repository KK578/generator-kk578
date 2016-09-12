module.exports = (util) => {
	const expect = util.expect;
	const request = util.request;
	const server = util.server;
	const fs = require('fs');
	const path = require('path');

	describe('Custom Component Development Route', () => {
		before((done) => {
			const bowerDir = path.join(__dirname, '../tmp/build/public/custom-components/fake-element/');

			fs.stat(bowerDir, (err, stats) => {
				if (err) {
					done(err);
				}
				else {
					if (stats.isDirectory()) {
						done();
					}
					else {
						done(new Error('custom-components/fake-element is not a directory.'));
					}

				}
			});
		});

		describe('HTML', () => {
			it('should GET "/custom-components/fake-element/fake-element.html"', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.html')
					.end((err, res) => {
						expect(res.status).to.equal(200);

						done();
					});
			});

			it('should inject CSS into fake-element.html', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.html')
					.end((err, res) => {
						expect(res.text).to.match(/SomeCSS{display:block}/);

						done();
					});
			});
		});

		describe('CSS', () => {
			it('should GET "/custom-components/fake-element/fake-element.css"', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.css')
					.end((err, res) => {
						expect(res.status).to.equal(200);

						done();
					});
			});

			it('should not send any content to fake-element.css', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.css')
					.end((err, res) => {
						expect(res.text).to.equal('');

						done();
					});
			});
		});

		describe('Javascript', () => {
			it('should GET "/custom-components/fake-element/fake-element.js"', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.js')
					.end((err, res) => {
						expect(res.status).to.equal(200);

						done();
					});
			});

			it('should respond with ES6 by default', (done) => {
				request(server)
					.get('/custom-components/fake-element/fake-element.js')
					.end((err, res) => {
						expect(res.text).to.equal('const x = (y) => { return y^2 };');

						done();
					});
			});

			it('could transpile to ES5 on request');
		});

	});
};

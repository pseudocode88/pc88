const path = require('path');

// Export the base directory path
module.exports = {
	path: {
		basedir: path.join(__dirname),
		db: path.join(__dirname, 'db'),
		articles: path.join(__dirname, 'articles')
	}
};

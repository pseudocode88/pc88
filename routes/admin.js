const express = require('express');
const router = express.Router();

const Blog = require("../modules/blog");

// Routes
router.get('/', (req, res) => {
	Blog.getPosts((docs) => {
		res.render('admin/home', {
			"articles": docs
		});
	})
});

router.get('/blog/new-post', (req, res) => {
	if (req.query.edit) {
		Blog.getPost(req.query.id, (doc) => {
			doc.dateObj = doc.dateObj.toISOString().split('T')[0];
			res.render('admin/form_new_post', {
				"edit": true,
				"doc": doc
			});
		});
	} else {
		res.render('admin/form_new_post', {
			"edit": false,
			"doc": {}
		});
	}
});

router.post('/blog/create', (req, res) => {
	Blog.createPost(req.body, () => {
		res.redirect('/admin')
	});
});

router.post('/blog/edit', (req, res) => {
	Blog.editPost(req.body, () => {
		res.redirect('/admin')
	});
});

router.get('/blog/delete/:id/:filename', (req, res) => {
	Blog.deletePost(req.params.id, req.params.filename, () => {
		res.redirect('/admin');
	})

})

module.exports = router;
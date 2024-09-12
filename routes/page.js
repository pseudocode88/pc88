const express = require('express');
const router = express.Router();
const {marked} = require('marked');

const Blog = require("../modules/blog");

router.get('/', function (req, res) {
	res.render('page/home', {
		pageTitle: "Homie",
		selected: "home",
		headingTitle: "I'm PseudoCode.",
		headingMessage: "I help businesses launch scalable and impactful products."
	})
});

router.get('/blog', function (req, res) {
	Blog.getPosts((docs) => {
		res.render('page/blog', {
			pageTitle: "Blog",
			selected: "blog",
			headingTitle: "Blog",
			headingMessage: "I write about design, design systems and professional growth.",
			posts: docs
		});
	})
});

router.get('/blog/:slug', function (req, res) {
	Blog.getPost(req.params.slug, (post) => {
		const htmlContent = marked(post.content);

		res.render('page/blog_post', {
			pageTitle: post.title,
			selected: "blog",
			headingTitle: 'Blog',
			headingMessage: post.title,
			formattedDate: post.formattedDate,
			post: post,
			htmlContent: htmlContent
		});
	}, true);
});

router.get('/about', function (req, res) {
	Blog.getPosts((docs) => {
		res.render('page/about', {
			pageTitle: "About",
			selected: "about",
			headingTitle: "About",
			headingMessage: "Designer, programmer, music buff, in love with the web.",
			posts: docs
		});
	})
});

module.exports = router;
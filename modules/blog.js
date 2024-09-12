const {unlinkSync, mkdir, writeFile, readFileSync} = require("node:fs");
const {join} = require("node:path");
const NeDB = require('nedb');
const moment = require("moment");
const config = require('../config');

const db = new NeDB({
	filename: join(config.path.db, 'blog.db'),
	autoload: true
});

createFilename = (date, slug) => {
	return `${date.replace(/\s/g, '_')}_${slug.replaceAll('-', '_')}.md`;
}

let MarkdownFile = {}

createMarkdownFile = (filename, content) => {
	const filePath = join(config.path.articles, filename);
	writeMarkdownFile(filePath, content);
}

writeMarkdownFile = (filePath, content) => {
	writeFile(filePath, content, () => {
	});
}

deleteMarkdownFile = (filename) => {
	unlinkSync(join(config.path.articles, filename))
}

readMarkdownFile = (filename) => {
	return readFileSync(join(config.path.articles, filename), 'utf8');
}

let Blog = {};

Blog.createPost = (data, callback) => {
	const {title, content, date, category, description, slug} = data;
	const dateObj = new Date(date);
	const formattedDate = moment(dateObj).format('DD MMMM YYYY');
	const filename = createFilename(date, slug);

	createMarkdownFile(filename, content);

	db.insert({
		title,
		category,
		description,
		slug,
		dateObj,
		formattedDate,
		filename
	}, (err) => {
		callback();
	})
}

Blog.deletePost = (id, filename, callback) => {
	db.remove({_id: id}, (err, removed) => {
		deleteMarkdownFile(filename);
		callback(err)
	})
}

Blog.editPost = (data, callback) => {
	const id = data._id;
	const content = data.content;

	delete data._id;
	delete data.content;

	const dateObj = new Date(data.date);
	data.formattedDate = moment(dateObj).format('DD MMMM YYYY');
	data.dateObj = dateObj;

	writeMarkdownFile(join(config.path.articles, data.filename), content);
	db.update({_id: id}, {$set: data}, () => {
		callback()
	});
}

Blog.getPosts = (callback) => {
	db.find({}).sort({dateObj: -1}).exec(function (err, docs) {
		callback(docs);
	})
}

Blog.getPost = (id, callback, slug = false) => {
	const identifier = (slug) ? {slug: id} : {_id: id};

	db.findOne(identifier, (err, doc) => {
		doc.content = readMarkdownFile(doc.filename);
		callback(doc)
	})
}

module.exports = Blog;
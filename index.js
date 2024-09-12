require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const admin = require('./routes/admin');
const page = require('./routes/page');

function authMiddleware(req, res, next) {
	if (process.env.ADMIN_ENABLED === 'true') {
		return next();
	} else {
		return res.status(403).json({message: 'Forbidden - Admin not enabled'});
	}
}

app.set('view engine', 'pug')

app.use(express.static('public/css'))
app.use(express.static('public/js'))
app.use(express.static('public/assets'))
app.use(express.static('public/articles'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', page);
app.use('/admin', authMiddleware, admin);

app.listen(process.env.PORT || 8000);
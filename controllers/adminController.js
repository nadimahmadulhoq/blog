const Post = require('../models/Post');

const dashboard = (req, res) => {
	res.render('admin/dashboard'); 
}

const posts = (req, res) => {
	Post.findAll().then(posts => {
	 	res.render('admin/posts', {
	 	all_post: posts});
	});


	
}

const addPost = (req, res) => {
	res.render('admin/add-post');
}

const submitPost = (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const author = req.body.author;

	Post.create({ title, description, author })
	.then(post => {
		console.log('done.');
		res.redirect('/admin/posts');
	})
	.catch(err => console.log(err));
	
}

module.exports = {dashboard, posts, addPost, submitPost}
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

const storePost = (req, res) => {
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

const editPost = (req, res) => {
	const id = req.body
	.id;
	Post.findOne( {where: {id: id}} )
	.then(data => {
			res.render('admin/edit-post', {
			post: data
		});
	})
	.catch(err => console.log(err));

}

const updatPost = (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const author = req.body.author;

	Post.update({title, description, author}, {where:{id:req.body.id}})
	.then(() => {
		res.redirect('/admin/posts')
		.catch(err => console.log(err));
	});

}

const deletePost = (req, res) => {
	Post.destroy({where:{id:req.params.id}})
	.then(() => {
		res.redirect('/admin/posts');
	})
	.catch(err => console.log(err));
}

module.exports = {dashboard, posts, addPost, storePost, editPost, updatPost, deletePost}
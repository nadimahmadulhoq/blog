const Post = require('../models/Post');

const dashboard = (req, res, next) => {
	// console.log(req.session.user);
	// if(!req.session.user){
	// console.log(req.session.user);
		
	// 	return res.redirect('/login');
	// }

	res.render('admin/dashboard', {
		path:'/admin/dashboard'
	}); 
}

const posts = (req, res) => {
	Post.findAll().then(posts => {
	 	res.render('admin/post/posts', {
	 	all_post: posts,
	 	path:'/admin/posts'
	 });
	});	
}

const addPost = (req, res) => {
	res.render('admin/post/add-post', {
		path:'/admin/add-post'
	});
}

const storePost = (req, res) => {
	const {title, description, author} = req.body;
	const image = req.file;

	if(!image){
		req.flash('error_msg', 'File should be and imgae.');
		return res.redirect('/admin/add-post');
	}

	const imageUrl = image.path;

	Post.create({ title, imageUrl, description, author })
	.then(post => {
		req.toastr.success('Posted Successfully!', 'Your post.');
		console.log('done.');
		res.redirect('/admin/posts');
	})
	.catch(err => console.log(err));
	
}

const editPost = (req, res) => {
	Post.findOne( {where: {id: req.params.id}} )
	.then(data => {
			res.render('admin/post/edit-post', {
			post: data,
			path:'/admin/edit-post'
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
	Post.destroy({where:{id:req.body.id}})
	.then(() => {
		res.redirect('/admin/posts');
	})
	.catch(err => console.log(err));
}

module.exports = {dashboard, posts, addPost, storePost, editPost, updatPost, deletePost}
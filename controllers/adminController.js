const dashboard = (req, res) => {
	res.render('admin/dashboard'); 
}

const addPost = (req, res) => {
	res.render('admin/post/add');
}

module.exports = {dashboard, addPost}
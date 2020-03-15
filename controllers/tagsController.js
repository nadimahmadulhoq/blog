const Tag = require('../models/Tag');
module.exports = {
    tags: (req, res) => {
        Tag.findAll()
        .then(tags => {
            res.render('admin/tag/tags', {
                path: '/admin/tags',
                all_tag: tags
            } );
        })
    },

    addTag: (req, res) => {
        res.render('admin/tag/add-tag', {
            path: '/admin/tags'
        });
    },

    storeTag: (req, res) => {
        const {name} = req.body;

        Tag.create({name}).then(tag => {
            res.redirect('/admin/tags');
        })
        .catch(err => {
            console.log(err);
        });
    }
}
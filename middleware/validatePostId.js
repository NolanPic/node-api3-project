const postDb = require('../posts/postDb');

const validatePostId = (req, res, next) => {
    const { id } = req.params;
    postDb.getById(id).then(post => {
        if(!post) {
            res.status(400).json({ message: "invalid post id" });
        }
        else {
            req.post = post;
            next();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
    });
};

module.exports = validatePostId;

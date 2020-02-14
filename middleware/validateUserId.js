const userDb = require('../users/userDb');

const validateUserId = (req, res, next) => {
    const { id } = req.params;
    userDb.getById(id).then(user => {
        if(!user) {
            res.status(400).json({ message: "invalid user id" });
        }
        else {
            req.user = user;
            next();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
    });
};

module.exports = validateUserId;

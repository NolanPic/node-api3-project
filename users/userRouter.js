const express = require('express');
const { validateUser, validateUserId, validatePost } = require('../middleware');
const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const user = req.body;
  userDb.insert(user).then(created => {
    res.status(201).json(created);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong creating this user" });
  });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { userId } = req.params;
  const post = { ...req.body, user_id: userId };
  postDb.insert(post).then(created => {
    res.status(201).json(created);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong creating this post" });
  });
});

router.get('/', (req, res) => {
  userDb.get().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong getting users" });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  userDb.getById(id).then(user => {
    res.status(200).json(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong getting this user" });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { userId } = req.params;
  userDb.getUserPosts(userId).then(posts => {
    res.status(200).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong getting this user's posts" });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  userDb.remove(id).then(() => {
    res.status(204).send();
  }).catch(err => {
    res.status(500).json({ error: "Something went wrong removing this user" })
  });
});

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  const user = req.user; // <== from validateUserId middleware
  userDb.update(id, user).then(updated => {
    res.status(200).json(updated);
  }).catch(err => {
    res.status(500).json({ error: "Something went wrong updating this user" });
  });
});

module.exports = router;

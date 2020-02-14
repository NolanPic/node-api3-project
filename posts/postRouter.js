const express = require('express');
const postDb = require('./postDb');
const { validatePostId, validatePost } = require('../middleware');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get().then(posts => {
    res.status(200).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong getting posts" });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  postDb.getById(id).then(post => {
    res.status(200).json(post);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong getting this post" });
  });
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
  .then(() => res.status(204).send())
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong deleting this post" });
  });
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  const { id } = req.params;
  const post = { ...req.body, id };
  postDb.update(id, post).then(updated => {
    res.status(200).json(updated);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong updating this post" });
  });
});

module.exports = router;

const express = require('express');
const { validateUser, validateUserId } = require('../middleware');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUser, validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

module.exports = router;

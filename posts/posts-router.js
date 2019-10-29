const express = require('express');
const router = express.Router();

const Posts = require('../data/db');

router.post('/', (req, res) => {
// insert(postObj)
});

router.post('/:id/comments', (req, res) => {
// insertComment(commentObj)
});

router.get('/', (req, res) => {
// find()
  Posts.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting posts" })
    })
});

router.get('/:id', (req, res) => {
// findById(id)
});

router.get('/:id/comments', (req, res) => {
// findPostComments(id)
});

router.delete('/:id', (req, res) => {
// remove(id)
});

router.put('/:id', (req, res) => {
// update(id, changesObj)
});

module.exports = router;
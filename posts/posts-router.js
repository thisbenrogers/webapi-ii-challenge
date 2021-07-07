const express = require('express');
const router = express.Router();

const Posts = require('../data/db');

router.post('/', (req, res) => {
// insert(postObj)
const { title, contents } = req.body;
  if (!title || !contents) {
   res.status(400).json({ errorMessage: "Please provide title and content for the post." })
  }
  Posts.insert(req.body)
    // .then(post => {
    //   res.status(201).json(post)
    // })
    .then(post => {
      Posts.findById(post.id)
        .then(post => {
          res.status(201).json(post)
        })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.post('/:id/comments', (req, res) => {
// insertComment(commentObj)
const id = req.params.id;
const body = req.body;
if (!id) {
  res.status(404).json({ message: "The post with the specified ID does not exist." })
} else if (!body.text) {
  res.status(400).json({ errorMessage: "Please provide text for the comments." })
 }
 Posts.insertComment(body)
    .then(post => {
      Posts.findCommentById(post.id)
        .then(comment => {
          res.status(201).json(comment)
        })
    })
    .catch(err => {
     res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
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
const id = req.params.id;

if (!id) {
  res.status(404).json({ message: "The post with the specified ID does not exist." })
}
Posts.findById(id)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
});

router.get('/:id/comments', (req, res) => {
// findPostComments(id)
const id = req.params.id;
if (!id) {
  res.status(404).json({ message: "The post with the specified ID does not exist." })
}
Posts.findPostComments(id)
  .then(comments => {
    res.status(201).json(comments)
  })
  .catch(err => {
    res.status(500).json({ error: "The comments information could not be retrieved." })
  })
});

router.delete('/:id', (req, res) => {
// remove(id)
const id = req.params.id;

if (!id) {
  res.status(404).json({ message: "The post with the specified ID does not exist." })
}
Posts.findById(id)
  .then(post => {
    Posts.remove(id)
      .then(() => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be reomved." })
      })
  })
});

router.put('/:id', (req, res) => {
// update(id, changesObj)
const id = req.params.id;
const { title, contents } = req.body;
if (!id) {
  res.status(404).json({ message: "The post with the specified ID does not exist." })
} else if (!title || !contents) {
  res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
}
Posts.update(id, req.body)
  .then(() => {
    Posts.findById(req.params.id)
      .then(post => {
        res.status(200).json(post)
      })
  })
  .catch(err => {
    res.status().json()
  })
});

module.exports = router;
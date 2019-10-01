const express = require('express');

const Posts = require('../data/db');

const router = express.Router();


// POST /api/posts  ----  insert(post)
// Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
    const post = req.body;

    if (!post.title || !post.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {    
        Posts.insert(post)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the post',
            });
        });
    }
});

// POST /api/posts/:id/comments  ----  insertComment(comment)
// Creates a comment for the post with the specified id using
// information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
})

// GET /api/posts  ----  find()
// Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving posts'
            });
        });
});

// GET /api/posts/:id  ----  findById(id)
// Returns the post object with the specified id.


// GET /api/posts/:id/comments  ----  findPostComments(id)
// Returns an array of all the comment objects associated with the post with the specified id.


// DELETE /api/posts/:id  ----  remove(id)
// Removes the post with the specified id and returns the deleted post object. You may need to 
// make additional calls to the database in order to satisfy this requirement.


// PUT /api/posts/:id  ----  update(id, changes)
// Updates the post with the specified id using data from the request body. 
// Returns the modified document, NOT the original.

module.exports = router;
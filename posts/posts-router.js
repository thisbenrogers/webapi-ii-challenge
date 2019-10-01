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
    const comment = req.body;

    if (comment.post_id !== req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    } else if (!comment.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    } else {
        Posts.insertComment(req.body)
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                })
            })
    }
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
                error: "The posts information could not be retrieved."
            });
        });
});

// GET /api/posts/:id  ----  findById(id)
// Returns the post object with the specified id.
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})


// GET /api/posts/:id/comments  ----  findPostComments(id)
// Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    Posts.findPostComments(id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

// DELETE /api/posts/:id  ----  remove(id)
// Removes the post with the specified id and returns the deleted post object. You may need to 
// make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

// PUT /api/posts/:id  ----  update(id, changes)
// Updates the post with the specified id using data from the request body. 
// Returns the modified document, NOT the original.

module.exports = router;
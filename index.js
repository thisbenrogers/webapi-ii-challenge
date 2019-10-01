const express = require('express');

// const postsRouter = require('posts/posts-router.js');

const server = express();

server.use(express.json());

// server.use('/api/posts', postsRouter);

const port = 4444;
server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port}*** \n`);
})
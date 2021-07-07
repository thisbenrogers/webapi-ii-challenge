const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

const port = 6669;
server.listen(port, () => {
  console.log(`\n<<< Server running on port ${port} >>>\n`)
})
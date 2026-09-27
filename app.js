import express from 'express';
import postsRouter from './routers/posts.js';
import { errorHandler, notFound } from './middlewares.js';

const app = express();
const port = 3000;

// static assets
app.use(express.static("public"));

// body-parser
app.use(express.json());

// routing
app.use('/posts', postsRouter);

// error handler
app.use(errorHandler);

// page not found
app.use(notFound);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`
    );
})
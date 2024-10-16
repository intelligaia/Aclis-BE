'use strict';
const Koa = require('koa'); // Koa framework
const body = require('koa-body'); // Koa Body Parser
const compose = require('koa-compose'); // middleware composer
const compress = require('koa-compress'); // HTTP compression
const session = require('koa-session'); // session for flash messages
const bodyParser = require('koa-bodyparser'); // body parser for form data
const logger = require('koa-logger'); // logger for requests
const serve = require('koa-static'); // static file server
const views = require('koa-views'); // view rendering
const cors = require('@koa/cors'); // CORS support
require('dotenv').config(); // load environment variables

const app = new Koa();

app.use(cors());
app.use(logger()); // Log all requests

/* setup global middleware */
require('./bootstrap/errors');
require('./bootstrap/globals');

/* Error handling middleware */
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || err.code || 500; // Use err.status if available
        ctx.body = {
            code: err.code,
            name: err.name,
            message: err.message
        };
    }
});

// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.response.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
});

// parse request body into ctx.request.body
app.use(body({ multipart: true }));
app.use(bodyParser());

// clean up post data - trim & convert blank fields to null
app.use(async function cleanPost(ctx, next) {
    for (const key in ctx.request.body) {
        if (typeof ctx.request.body[key] === 'string') {
            ctx.request.body[key] = ctx.request.body[key].trim();
            if (ctx.request.body[key] === '') ctx.request.body[key] = null;
        }
    }
    await next();
});

// HTTP compression
app.use(compress({}));

// set signed cookie keys for JWT cookie & session cookie
app.keys = ['Koa2-API-App'];

// session for flash messages
app.use(session(app));

// intialise routes
require('./app/router/routes')(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`${process.version} listening on port ${port} (${app.env})`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    process.exit(0);
});

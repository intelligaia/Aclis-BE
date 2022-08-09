const Koa          =        require('koa')              // Koa framework
const body         =        require('koa-body')         // Koa Body Parser
const compose      =        require('koa-compose');     // middleware composer
const compress     =        require('koa-compress');    // HTTP compression
const session      =        require('koa-session');     // session for flash messages
const bodyParser   =        require('koa-bodyparser')   // body parser for form data
const logger       =        require('koa-logger');      // logger for requests
const serve        =        require('koa-static');      // static file server
const views        =        require('koa-views');       // view rendering
const cors         =        require('@koa/cors');       // CORS support
                            require('dotenv').config()  // load environment variables

const app = new Koa();

app.use(cors());

/* setup global middleware */
require('./bootstrap/errors');
require('./bootstrap/globals');

/* set up middleware which will be applied to each request - - - - - - - - - - - - - - - - - - -  */
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.code || err.message || 500;
      ctx.body = {
        code: err.code,
        name: err.name,
        message: err.message
      };
    }
  })


// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.response.set('X-Response-Time', Math.ceil(t2-t1)+'ms');
});

// parse request body into ctx.request.body
// - multipart allows parsing of enctype=multipart/form-data
app.use(body({ multipart: true }));
app.use(bodyParser());


// clean up post data - trim & convert blank fields to null
app.use(async function cleanPost(ctx, next) {
    for (const key in ctx.request.body) {
        if (typeof ctx.request.body[key] == 'string') {
            ctx.request.body[key] = ctx.request.body[key].trim();
            if (ctx.request.body[key] == '') ctx.request.body[key] = null;
        }
    }
    await next();
});


// HTTP compression
app.use(compress({}));

// set signed cookie keys for JWT cookie & session cookie
app.keys = [ 'Koa2-API-App' ];

// session for flash messages [& compose] (uses signed session cookies, with no server storage)
app.use(session(app));

// intialise routes
require('./app/router/routes')(app);


/* Initialise Server Connection - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

app.listen(process.env.PORT||3000);
console.info(`${process.version} listening on port ${process.env.PORT||3000} (${app.env})`);
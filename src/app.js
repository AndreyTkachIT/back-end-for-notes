const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('./config');

const notesModule = require('./modules/notes/notes');
const authModule = require('./modules/auth/auth');

const db = require('../models/db');

function createApp() {
    db.connectDb();

    const app = new Koa();
    const router = new Router();

    router.use('/auth', authModule.routes());
    router.use(jwt({secret: config.secretKey}));
    router.use('/notes', notesModule.routes());

    app.use(router.allowedMethods());
    app.use(router.routes());

    return app;
}

if (!module.parent) {
    createApp().listen(process.env.PORT || 3000);
}

module.exports = createApp;
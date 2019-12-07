const Koa = require('koa');
const Router = require('koa-router');

const notesModule = require('./modules/notes/notes');
const authModule = require('./modules/auth/auth');
const db = require('../models/db');


function createApp() {
    db.connectDb();

    const app = new Koa();
    const router = new Router();
    router.get('/', ctx => {
        ctx.body = 'ok';

    });

    router.use('/auth', authModule.routes());

    router.use('/notes', notesModule.routes());


    app.use(router.allowedMethods());
    app.use(router.routes());

    return app;
}

if (!module.parent) {
    createApp().listen(process.env.PORT || 3000);
}

module.exports = createApp;
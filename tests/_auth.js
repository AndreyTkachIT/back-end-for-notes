import test from "ava";
const agent = require("supertest-koa-agent");
const createApp = require("../src/app");

const app = agent(createApp());

test('User can be successfully login', async t => {
  const res = await app.post('/auth/login').send({
    login: 'admin@aney.com.ua',
    password: 'admin',
  });
  t.is(res.status, 200);
  t.truthy(typeof res.body.token === 'string');
  t.truthy(typeof res.body.refreshToken === 'string');
});
test.todo('User gets 403 on invalid credentials');
test.todo('User receives 401 on expired token');
test.todo('User can refresh access token using refresh token');
test.todo('User can use refresh toke only once');
test.todo('Refresh token become invalid on logout');
test.todo('Multiple refresh token ara valid');
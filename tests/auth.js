import test from "ava";
const agent = require("supertest-koa-agent");
const createApp = require("../src/app");
const issueToken = require('./helper/issueToken');
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

test('User gets 403 on invalid credentials', async t => {
  const res = await app.post('/auth/login').send({
    login: 'INVALID',
    password: 'INVALID',
  });
  t.is(res.status, 403);
});

test('User receives 401 on expired token', async t => {
  const expiredToken = issueToken({id: '5ded43c060b33c2b0ba9fdf7'}, {expiresIn: '1ms'});
  const res = await app.get('/notes').set('Authorization', expiredToken);
  t.is(res.status, 401);

});

test('User can get new access token using refresh token', async t => {
  const res = await app.post('/auth/refresh').send({
    refreshToken: '48652cb7-59cf-4c39-b6a2-7b912017a893',
  });
  t.is(res.status, 200);
  t.truthy(typeof res.body.token === 'string');
  t.truthy(typeof res.body.refreshToken === 'string');
});

test('User can use refresh toke only once', async t => {
  const firstRes = await app.post('/auth/refresh').send({
    refreshToken: '763fde8b-8f21-4c77-a631-95c4cf115dad',
  });
  t.is(firstRes.status, 200);
  t.truthy(typeof firstRes.body.token === 'string');
  t.truthy(typeof firstRes.body.refreshToken === 'string');

  const secondRes = await app.post('/auth/refresh').send({
    refreshToken: '763fde8b-8f21-4c77-a631-95c4cf115dad',
  });
  t.is(secondRes.status, 404);
  t.truthy(typeof secondRes.body.token === 'string');
  t.truthy(typeof secondRes.body.refreshToken === 'string');
});

test('User get 404 if connect with invalid refresh token', async t => {
  const res = await app.post('/auth/refresh').send({
    refreshToken: 'INVALID_REFRESH_TOKEN',
  });
  t.is(res.status, 404);
});

test('Refresh token become invalid on logout', async t => {
  const logoutRes = app.post('/auth/logout').set('Authorization', `Bearer ${issueToken({id: '5ded43c060b33c2b0ba9fdf7'})}`);
  t.is(logoutRes.status, 200);

  const secondRes = await app.post('/auth/refresh').send({
    refreshToken: '43a1dfc8-d8a5-4ed9-8362-e870fdf5a5b4',
  });
  t.is(secondRes.status, 404);
});

test.only('Multiple refresh token ara valid', async t => {
  const firstResponse = await app.post('/auth/login').send({
    login: 'admin@aney.com.ua',
    password: 'admin',
  });
  t.is(firstResponse, 200);

  const secondResponse = await app.post('/auth/login').send({
    login: 'admin@aney.com.ua',
    password: 'admin',
  });

  t.is(secondResponse, 200);

  const firstRefreshResponse = await app.post('/auth/refresh').send({
    refreshToken: firstResponse.body.refreshToken,
  });
  t.is(firstRefreshResponse.status, 200);
  t.truthy(typeof firstRefreshResponse.body.token === 'string');
  t.truthy(typeof firstRefreshResponse.body.refreshToken === 'string');

  const secondRefreshResponse = await app.post('/auth/refresh').send({
    refreshToken: secondResponse.body.refreshToken,
  });
  t.is(secondRefreshResponse.status, 200);
  t.truthy(typeof secondRefreshResponse.body.token === 'string');
  t.truthy(typeof secondRefreshResponse.body.refreshToken === 'string');

});
import test from "ava";
const agent = require("supertest-koa-agent");
const createApp = require("../src/app");
const issueToken = require('./helper/issueToken');
const app = agent(createApp());

const authLine = `Bearer ${issueToken({id: '5ded43c060b33c2b0ba9fdf7'})}`;

test("Notes list", async t => {
  const res = await app.get("/notes").set('Authorization', authLine);
  t.is(res.status, 200);
  t.truthy(Array.isArray(res.body));
});

test("Get note by id should be ok", async t => {
  const res = await app.get("/notes/5de536fce04d1d645f66f872").set('Authorization', authLine);
  t.is(res.status, 200);
});

test("Get note by invalid id should be 404", async t => {
  const res = await app.get("/notes/666").set('Authorization', authLine);
  t.is(res.status, 404);
});

import test from "ava";
const agent = require("supertest-koa-agent");
const createApp = require("../src/app");

const app = agent(createApp());

test("Notes list", async t => {
  const res = await app.get("/notes");
  t.is(res.status, 200);
  t.truthy(Array.isArray(res.body));
});

test("Get note by id should be ok", async t => {
  const res = await app.get("/notes/5de536fce04d1d645f66f872");
  t.is(res.status, 200);
});

test("Get note by invalid id should be 404", async t => {
  const res = await app.get("/notes/666");
  t.is(res.status, 404);
});

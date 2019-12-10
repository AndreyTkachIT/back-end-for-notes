const Router = require("koa-router");
const { list, findById } = require("../../services/note");

const router = new Router();

router.get("/", async ctx => {
  ctx.body = await list();
});

router.get("/:id", async ctx => {
  const note = await findById(ctx.params.id);
  if (note) {
    ctx.body = note;
  } else {
    ctx.status
  }
});

module.exports = router;

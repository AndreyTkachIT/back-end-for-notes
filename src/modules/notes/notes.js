const Router = require("koa-router");
const { listNotes, findNoteById, deleteNote } = require("../../services/note");

const router = new Router();



router.get("/", async ctx => {
  ctx.body = await listNotes();
});

router.get("/:id", async ctx => {
  const note = await findNoteById(ctx.params.id);
  if (note) {
    ctx.body = note;
  } else {
    ctx.status
  }
});

module.exports = router;

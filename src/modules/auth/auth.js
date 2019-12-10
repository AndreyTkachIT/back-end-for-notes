const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { compareSync } = require("bcryptjs");
const uuid = require("uuid/v4");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("koa-jwt");
const config = require("../../config");

const userService = require("../../services/user");
const refreshTokenService = require("../../services/refreshToken");

const router = new Router();

router.post("/register", bodyParser(), async ctx => {});

router.post("/login", bodyParser(), async ctx => {
  const { login, password } = ctx.request.body;
  const user = await userService.find(login);
  if (!user || !compareSync(password, user.password)) {
    const error = new Error();
    error.status = 403;
    throw error;
  }
  const refreshToken = uuid();
  ctx.body = {
    token: jwt.sign({ id: user.id }, config.secretKey),
    refreshToken
  };

  await refreshTokenService.create(user.id, refreshToken);
});

router.post("/refresh", bodyParser(), async ctx => {
  const { refreshToken } = ctx.request.body;

  const dbToken = await refreshTokenService.find(refreshToken);

  if (!dbToken) {
    return;
  }

  const newRefreshToken = uuid();
  ctx.body = {
    token: jwt.sign({ id: dbToken.userId }, config.secretKey),
    refreshToken: newRefreshToken
  };

  await refreshTokenService.create(dbToken.userId, newRefreshToken);

  await refreshTokenService.removeOne(dbToken.refreshToken);
});

router.post(
  "/logout",
  jwtMiddleware({ secret: config.secretKey }),
  async ctx => {
    const { id } = ctx.state.user;
    await refreshTokenService.removeAll(id);

    ctx.body = { success: true };
  }
);

module.exports = router;

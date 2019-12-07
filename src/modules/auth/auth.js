const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const { compareSync } = require('bcryptjs');
const userService = require("../../services/user");
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const SECRET_KEY = 'SEKRETKEY';


const router = new Router();

router.post('/register', bodyParser(), async ctx => {


});

router.post('/login', bodyParser(), async ctx => {
  const {login, password} = ctx.request.body;
  const user = await userService.findByUser(login);
  console.log(user);
  if (!user || !compareSync(password, user.password)) {
    const error = new Error();
    error.status = 403;
    throw error;
  }
  const refreshToken = uuid();
  ctx.body = {
    token: jwt.sign({id: user._id}, SECRET_KEY),
    refreshToken,
  };
});


module.exports = router;

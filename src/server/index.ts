import Koa, { Context, ParameterizedContext } from 'koa';
import logger from 'koa-logger';
import pino from 'koa-pino-logger';
import session from 'koa-session';

import router from './routes';

const app = new Koa();
// app.use(logger);
app.use(pino());
// // app.use(session({

// // }));

app.use(async ({ request, response }, next) => {
  request.ctx.log.info('');
  // ctx.response.ctx.log.info('');
  // ctx.log.info('haha');
  await next();
});
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
app.use(router.routes());

app.listen(3001, () => {
  // console.log(`server is listening on `);
});

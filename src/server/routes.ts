import Router from 'koa-router';

const router = new Router();

router.get('/api/ping', async (ctx, next) => {
  ctx.log.info('ppppppppp');
  ctx.body = 'pong';
  await next();
});

export default router;

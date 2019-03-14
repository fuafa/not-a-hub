import * as fastify from 'fastify';
import {
  Server,
  IncomingMessage,
  ServerResponse
} from 'http';
import hello from './routes/hello';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/api/ping', opts, async () => {
  return { pong: 'pong' };
});

server.register(hello);

// server.listen(3001, (err, address) => {
//   if (err) throw err;
// });

const start = async () => {
  try {
    await server.listen(3001)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

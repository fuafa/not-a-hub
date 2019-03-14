import * as fastify from 'fastify';
export default async function (server: fastify.FastifyInstance, options: any) {
  server.get('/api/hello', async () => {
    return { hello: 'world' };
  })
}
const http = require('node:http');
const DEFAULT_USER = {
  username: 'Erickwendel',
  password: '123',
};

const { once } = require('node:events');
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  // curl -i -X POST --data '{"username": "Erickwendel","password": "123"}' localhost:3000/login
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'));
    const toLower = (text) => text.toLowerCase();
    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end('Log in failed!');
      return;
    }
    return response.end('Log in succeeded!');
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('not found!');
  },
};

function handler(request, response) {
  const { url, method } = request;
  console.log({ url, method });

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  console.log('routes', routes);
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log('running at 3000'));

module.exports = app;

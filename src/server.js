import http from 'node:http';
import {routes} from './routes.js';
import { json } from './middleware/json.js';

const server = http.createServer(async (req, res) => {
  const { method, url} = req;

  await json(req, res);

  const route = routes.find(route => route.method === method && route.path === url);

  if(route){


    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not found');

});

server.listen(3000, () => {
  console.log('My pure http server node is listen on port 3000');
});
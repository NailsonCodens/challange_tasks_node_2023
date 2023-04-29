import { DataBase } from "./database.js";
import {randomUUID} from 'node:crypto';
import {buildRoutePath} from './utils/build.route-path.js'

const database = new DataBase();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {search} = req.query;

      const tasks = database.select('tasks', {
        title: search,
        description: search
      });
  
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {title, description} = req.body;

      const tasks = {
        id: randomUUID(),
        title: title,
        description: description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null
      }

      database.insert('tasks', tasks);

      return res.writeHead(204).end();
    }
  }
];

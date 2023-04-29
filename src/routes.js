import { DataBase } from "./database.js";
import {randomUUID} from 'node:crypto';

const database = new DataBase();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');
  
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const {title, description} = req.body;

      const tasks = {
        id: randomUUID(),
        title: title,
        description: description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: ""
      }

      database.insert('tasks', tasks);

      return res.writeHead(204).end();
    }
  }
];

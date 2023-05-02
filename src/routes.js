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
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const {id} = req.params
      const {title, description} = req.body;


      if(!title || !description){
        res.writeHead(404).end('Título de descrição são  obrigatórios');
      }

      const task = database.findById('tasks', id);

      if(!task){
        res.writeHead(404).end('Esta tarefa não existe');
      }

      const tasks = {
        title, 
        description        
      }

      database.update('tasks', id, tasks)

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const {id} = req.params
      const table = 'tasks';

      const task = database.findById(table, id);

      if(!task){
        res.writeHead(404).end('Esta tarefa não existe');
      }


      database.isCompleted(table, id);

      return res.writeHead(204).end();

    } 
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

      const {id} = req.params
      const table = 'tasks';

      const task = database.findById(table, id);

      if(!task){
        res.writeHead(404).end('Esta tarefa não existe.');
      }

      database.delete(table,id);

      
      res.writeHead(204).end();
    }
  }
];

import {resolve} from 'node:path'
import fs from 'node:fs/promises'

const pathDatabse = new URL('../db.json', import.meta.url);

export class DataBase{
  #database = {};

  constructor(){
    fs.readFile(pathDatabse, "utf8").then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    })
  }

  #persist(){
    fs.writeFile(pathDatabse, JSON.stringify(this.#database));
  }

  select(table, search){
    let tasks = this.#database[table] ?? [];
    if(search){
      tasks = tasks.filter(row => {
        return Object.entries(search).some(([key, value]) => {

          console.log(value);
          if(!value) return true

          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      })
    }

    return tasks;
  }

  findById(table, id){
    const tableTasks = this.#database[table];
    const task = tableTasks.find((row) => row.id === id);

    return task;
  }

  insert(table, data){
    const tableTasks = this.#database[table];

    if(Array.isArray(tableTasks)){
      this.#database[table].push(data);
    }else{
      this.#database[table] = [data];
    }

    this.#persist();
  }

  update(table, id, data){

    const tableTasks = this.#database[table];

    const task = tableTasks.findIndex((row) => row.id === id);

    if(task > -1){  
      if(data.title){
        tableTasks[task].title = data.title;
      }

      if(data.description){
        tableTasks[task].description = data.description;
      }
  
      this.#persist();
    }
  }

  isCompleted(table, id){
    const tableTasks = this.#database[table];

    const task = this.findById(table, id);

    const taskIndex = tableTasks.findIndex((row) => row.id === id);

    if(taskIndex > -1){
      tableTasks[taskIndex].completed_at = task.completed_at === null ? new Date() : null; 
      this.#persist();
    }
  }

  delete(table, id){
    const tableTasks = this.#database[table];

    const taskIndex = tableTasks.findIndex((row) => row.id === id)

    if(taskIndex > -1){
      tableTasks.splice(taskIndex, 1);

      this.#persist();
  
    }
  }

};
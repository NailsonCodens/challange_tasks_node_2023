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

  insert(table, data){
    const tableTasks = this.#database[table];

    if(Array.isArray(tableTasks)){
      this.#database[table].push(data);
    }else{
      this.#database[table] = [data];
    }

    this.#persist();
  }
};
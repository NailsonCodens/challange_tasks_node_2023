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

  select(table){
    return this.#database[table];
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
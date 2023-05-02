import { parse } from 'csv-parse'
import fs from 'node:fs';

const file =  new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(file);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 
});


async function run (){

  const lines = stream.pipe(csvParse);

  for await (const line of lines){
    const [title, description] = line;

    console.log(line);

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })

    await wait(1000);
  }
}

run();

function wait(ms){
  return new Promise((resolve) => setTimeout(resolve, ms))
}
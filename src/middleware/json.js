import { buffer } from "stream/consumers";

export const json = async (req) => {
  const buffers = [];

  for await (const chunk of req ){
    buffers.push(chunk);
  }

  try {
    const buffersToString = Buffer.concat(buffers).toString();    

    req.body = JSON.parse(buffersToString);
    
  } catch (error) {
    req.body = null;
  }
}
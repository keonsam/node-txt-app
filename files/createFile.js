import {open, close, writeFileSync } from 'fs';


/**
* @typedef {Object} FileData 
* @property {string} fileName - file name e.i hello.World.txt
* @property {unknown} content - what goes in the file e.i Hello World this is John 
 */


/**
* This function create a file in /public directory
* @param {FileData} fileData - file information
* @returns {Promise}
*/
export function createFile({fileName, content}) {
    if(!fileName || !content) {
        throw new Error('fileName and content is required');
    }

    if(fileName === '' || typeof fileName !== 'string') {
        throw new Error('fileName must be a valid string of length more than zero');
    }

    if(content === '' || typeof content !== 'string') {
      throw new Error('content must be a valid string of length more than zero');
    }

  return new Promise((resolve, reject) => {
    open(`./public/${fileName}`, 'wx', (err, fd) => {
      if (err) {
          if (err.code === 'EEXIST') {
            reject(new Error(`${fileName} already exists, Please try updating file`));
          }
      
          reject(err);
      }

      try {
        writeFileSync(`./public/${fileName}`, content)
        resolve(`file name created: ${fileName}`);
      } finally {
        close(fd);
      }
    });
  });
}

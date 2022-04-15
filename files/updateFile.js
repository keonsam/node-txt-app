import {open, close, appendFileSync } from 'fs';


/**
* @typedef {Object} FileContent
* @property {unknown} content - what goes in the file e.i Hello World this is John 
 */


/**
* This function create a file in /public directory
* @param {FileContent} content - file information
* @returns {Promise}
*/
export function updateFile(fileName, {content}) {
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
    open(`./public/${fileName}`, 'r', (err, fd) => {
      if (err) {
          if (err.code === 'EEXIST') {
            reject(new Error(`${fileName} does not exists, Please try creating a file`));
          }
      
          reject(err);
      }

      try {
        appendFileSync(`./public/${fileName}`, `\n${content}`)
        resolve(`${fileName} was updated`);
      } finally {
        close(fd);
      }
    });
  });
}

import {open, close, unlinkSync } from 'fs';

/**
* This function create a file in /public directory
* @param {string} fileName - file name e.i hello.World.txt
* @returns {Promise}
*/
export function deleteFile(fileName) {
    if(!fileName) {
        throw new Error('fileName is required');
    }

    if(fileName === '' || typeof fileName !== 'string') {
        throw new Error('fileName must be a valid string of length more than zero');
    }

  return new Promise((resolve, reject) => {
    open(`./public/${fileName}`, 'r', (err, fd) => {
      if (err) {
          if (err.code === 'EEXIST') {
            reject(new Error(`${fileName} doesn't exists.`));
          }
      
          reject(err);
      }

      try {
        unlinkSync(`./public/${fileName}`)
        resolve(`file of ${fileName} was deleted`);
      } finally {
        close(fd);
      }
    });
  });
}
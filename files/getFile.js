import { open, close, createReadStream } from 'fs';

/**
* This function create a file in /public directory
* @param {string} fileName - file name e.i helloWorld.txt
* @param {import("http").ServerResponse} res 
* @returns
*/
export function getFile(fileName, res) {
    if(!fileName) {
        throw new Error('fileName is required');
    }

    if(fileName === '' || typeof fileName !== 'string') {
        throw new Error('fileName must be a valid string of length more than zero');
    }

    const fileLocation = `./public/${fileName}`

    open(`./public/${fileName}`, 'r', (err, fd) => {
        if (err) {
            res.statusCode = 400;
            if (err.code === 'EEXIST') {
            res.end(`${fileName} doesn't exists, Please creating one first.`);
            return;
            }
        
            res.end(`an error occurred ${err}`);
            return;
        }

        try {
        res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        
        const fileStream = createReadStream(fileLocation);
        fileStream.pipe(res);
        } finally {
            if (fd) {
                close(fd);
            }
        }
    })
}

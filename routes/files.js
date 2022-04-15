import { createFile } from "../files/createFile.js"
import { deleteFile } from "../files/deleteFile.js";
import { getFile } from "../files/getFile.js";
import { updateFile } from "../files/updateFile.js";


/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res
 * @param {import("url").URL.searchParams} searchParams
 */
export async function handleFiles(req, res, searchParams) {
    switch(req.method) {
        case 'POST':
            let body = '';
            
            req.on('data', (chuck) => {
                body += chuck.toString();
            });

            req.on('end', async () => {

                try {
                    /**
                    * @type {import("../files/createFile").FileData}
                    */
                    const fileData = JSON.parse(body);
                    const message = await createFile(fileData, res);
                    res.statusCode = 200;
                    res.end(message);
                }catch(e) {
                    console.error("e", e);
                    res.statusCode = 400;
                    res.end(e?.message);
                }
            })
            break;
        case 'GET':
            try {
                getFile(searchParams.get("fileName"), res);
            }catch(e) {
                console.error("e", e);
                res.statusCode = 400;
                res.end(e?.message);
            }
            break;
        case 'DELETE':
            try {
                const message = await deleteFile(searchParams.get("fileName"));
                res.statusCode = 200;
                res.end(message);
            }catch(e) {
                console.error("e", e);
                res.statusCode = 400;
                res.end(e?.message);
            }
            break;
        case 'PUT':
            let updateBody = '';
            
            req.on('data', (chuck) => {
                updateBody += chuck.toString();
            });

            req.on('end', async () => {
                try {
                    /**
                    * @type {import("../files/updateFile.js").FileContent}
                    */
                    const fileContent = JSON.parse(updateBody);
                    const message = await updateFile(searchParams.get("fileName"), fileContent);
                    res.statusCode = 200;
                    res.end(message);
                }catch(e) {
                    console.error("e", e);
                    res.statusCode = 400;
                    res.end(e?.message);
                }
            })
            break;
        default:
            console.log('unhandled request method');
            res.statusCode = 400;
            res.end(`unhandled request method ${req.method}`);   
            break; 
    }
}
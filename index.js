import server from "./server.js";

const hostname = 'localhost'
const port = 3000

server.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});
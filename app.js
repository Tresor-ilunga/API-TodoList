import { createServer } from "node:http"
import { create, index, remove, update } from "./functions/api/todos.js"
import { NotFoundError } from "./functions/api/errors.js"
import { createReadStream } from "node:fs"

/**
 *  This is the main entry point of the application
 * 
 * @author tresor-ilunga <ilungat82@gmail.com>
 */
createServer(async (req, res) => {
        try {
            res.setHeader('Content-Type', 'application/json')
            const url = new URL(req.url, `http://${req.headers.host}`)
            const endpoint = `${req.method}:${url.pathname}`
            let results
            switch (endpoint) {
                case 'GET:/':
                    res.setHeader('Content-Type', 'text/html')
                    createReadStream('index.html').pipe(res)
                    return
                case 'GET:/todos':
                    results = await index(req, res)
                    break;
                case 'POST:/todos':
                        results = await create(req, res)
                        break;
                case 'DELETE:/todos':
                        results = await remove(req, res, url)
                        break;
                case 'PUT:/todos':
                        results = await update(req, res, url)
                        break;
                default:
                    res.writeHead(404)
            }
            if (results){
                res.write(JSON.stringify(results))
            }
        }catch (e){
            if (e instanceof NotFoundError) {
                res.writeHead(404)
            } else {
                throw e
            }
        }
    res.end()
}).listen('8000')
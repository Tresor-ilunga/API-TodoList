import { json } from "node:stream/consumers"
import { UpdateTodo, createTodo, findTodos, removeTodo } from "../todos_storage.js"


export async function index (req, res) {
    return await findTodos()
}

export async function create (req, res) {
    return createTodo(await json(req))
}

export async function remove (req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodo(id)
    res.writeHead(204)
}

export async function update (req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    return UpdateTodo (id, await json(req))
}
// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    "/auth/login?email=:email&password=:password": "/users?email=:email&password=:password",
    "/auth/user/:id": "/users/:id"
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server

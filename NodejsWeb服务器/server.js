const http = require('http')

const serverHandler = require('./app')

const server = http.createServer(serverHandler)

server.listen(9000, () => {
  console.log('server is running at port 9000')
})
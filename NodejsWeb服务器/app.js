const querystring = require('querystring')

const handleSiteRoute = require('./src/routes/site')

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then((postData) => {
    req.body = postData
    const siteDataPromise = handleSiteRoute(req, res)

    if (siteDataPromise) {
      siteDataPromise.then(siteData => {
        res.end(JSON.stringify(siteData))
      })
      return
    }

    // 未匹配到任何路由
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
  })
}

module.exports = serverHandler
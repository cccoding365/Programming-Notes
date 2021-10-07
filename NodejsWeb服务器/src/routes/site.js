const { SuccessModel } = require('../model/responseModel')
const { getList, getDetail, createNewSite } = require('../controllers/site')

const handleSiteRoute = (req, res) => {
  const method = req.method
  if (method === 'GET' && req.path === '/api/site/list') {
    const name = req.query.name || ''
    const listDataPromise = getList(name)
    return listDataPromise.then(res => {
      return new SuccessModel(res)
    })
  }
  if (method === 'GET' && req.path === '/api/site/detail') {
    const id = req.query.id || ''
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
    // return {
    //   message: '获取网站详情的接口'
    // }
  }
  if (method === 'POST' && req.path === '/api/site/new') {
    const siteData = req.body
    const newSiteData = createNewSite(siteData)
    return new SuccessModel(newSiteData)
  }
  if (method === 'POST' && req.path === '/api/site/update') {
    return {
      message: '更新网站的接口'
    }
  }
  if (method === 'POST' && req.path === '/api/site/delete') {
    return {
      message: '删除网站的接口'
    }
  }
}

module.exports = handleSiteRoute
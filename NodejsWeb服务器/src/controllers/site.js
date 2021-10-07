const { execSQL } = require('../db/mysql')

const getList = (name) => {
  // 从数据库中获取数据
  let sql = `select * from favorite_site where 1=1 `

  if (name) {
    sql += `and name='${name}' `
  }
  return execSQL(sql)
}

const getDetail = () => {
  return {
    id: 1,
    name: '名称1',
    address: '地址1',
    description: '描述1'
  }
}

const createNewSite = (siteData) => {
  console.log('siteData', siteData);
  return {
    id: 1
  }
}

module.exports = {
  getList,
  getDetail,
  createNewSite
}
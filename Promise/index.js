const fs = require('fs')
const path = require('path')

// function getFileContent(filename, callback) {
//   const fullFilename = path.resolve(__dirname, 'data', filename)
//   fs.readFile(fullFilename, (err, data) => {
//     if (err) {
//       console.error(err);
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// // 回调地狱
// getFileContent('a.json', (aData) => {
//   console.log('aData', aData);
//   getFileContent(aData.next, (bData) => {
//     console.log('bData', bData);
//     getFileContent(bData.next, (cData) => {
//       console.log('bData', cData);
//     })
//   })
// })

// promise
function getFileContent(filename) {
  const promise = new Promise((resolve, reject) => {
    const fullFilename = path.resolve(__dirname, 'data', filename)

    fs.readFile(fullFilename, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })

  return promise
}
getFileContent('a.json').then((aData) => {
  console.log('aData', aData)
  return getFileContent(aData.next)
}).then((bData) => {
  console.log('bData', bData)
  return getFileContent(bData.next)
}).then((cData) => {
  console.log('cData', cData)
})
const path = require('path')
const fs = require('fs')

const projectAbsolutePath = process.env.ProjectPath
const SubFolder = process.env.SubFolder || 'sdkjs/word'
const subPath = path.resolve(`${projectAbsolutePath}`, SubFolder)

const promises = []

if(fs.existsSync(subPath)) {
  const fileNames = fs.readdirSync(subPath)
  fileNames.forEach((fileName) => {
    readFile(subPath, fileName)
  })
  Promise.all(promises).then((arrResult)=>{
    console.log(arrResult.join('\n'))
  }).catch(console.log.bind(console))
} else {
  console.log('files not exist, please check path: ', subPath)
}

function readFile(filePath, fileName) {
  const filePathName = path.resolve(filePath, fileName)
  const isFileDirecgtory = fs.statSync(filePathName).isDirectory()
  if(isFileDirecgtory) {
    const fileNames = fs.readdirSync(filePathName)
    fileNames.forEach( (file) => {
      const childFilePath = path.resolve(filePathName, file)
      if(fs.statSync(childFilePath).isDirectory()) {
        readFile(filePathName, file)
      } else {
        print(filePathName, file)
      }
    })
  } else {
    print(filePath, fileName)
  }
}

function print(dir, file) {
  const fileAbsolutePath = path.resolve(dir, file)
  const index = dir.indexOf(subPath)
  if(index > -1) {
    dir = dir.slice(index + subPath.length)
  }
  if(dir.startsWith('/')) {
    dir = dir.slice(1)
  }
  if(String(file).startsWith('.') || !String(file).endsWith('.js')) {
    return
  }
  
  const item = `${dir ? dir + '/' : ''}${file}`
  let count = 0, i
  const p = new Promise((resolve, reject) => {
    fs.createReadStream(fileAbsolutePath)
    .on('data', function(chunk) {
      for (i=0; i < chunk.length; ++i)
        if (chunk[i] == 10) count++
    })
    .on('end', function() {
      // console.log(`${item}'s lines: ${count}`)
      // resolve(count)
      resolve(`${item}(${count})`)
    })
    .on('error', function(err) {
      reject(`${item} ${count} read failed`)
    })
  })
  promises.push(p)
}

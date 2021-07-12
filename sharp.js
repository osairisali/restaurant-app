const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const target = path.resolve(__dirname, 'src/public/images/heros')
const destination = path.resolve(__dirname, 'src/public/images/heros')

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination)
}

fs.readdir(target, (err, files) => {
  if (err) throw err
  console.log('read files array: ', files)
  files.forEach((file) => {
    sharp(`${target}/${file}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${file.split('.').slice(0, -1).join('.')}--large.jpg`))

    sharp(`${target}/${file}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${file.split('.').slice(0, -1).join('.')}--small.jpg`))
  })
})

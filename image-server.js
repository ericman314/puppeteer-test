const express = require('express')
const http = require('http')
const puppeteer = require('puppeteer')

const PORT = parseInt(process.env.PORT) || 3000

const app = express()
const server = new http.Server(app)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.get('/hello', (req, res) => {
  res.send('<html><h1>Hello, world!</h1></html>')
})

app.get('/render.png', (req, res) => {
  doRender()
    .then(image => {
      res.setHeader('content-type', 'image/png')
      res.send(image)
    })
    .catch(err => {
      console.error(err)
    })
})

async function doRender() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.setViewport({ width: 600, height: 400 })
  const url = `http://localhost:${PORT}/hello`
  await page.goto(url)
  await page.waitForNetworkIdle()
  let image = await page.screenshot()
  await browser.close()
  return image
}

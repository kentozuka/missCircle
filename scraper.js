const puppeteer = require('puppeteer')
const { pushEvent } = require('./modules/line')

const url = 'https://2020.misscircle.jp/entries/seconds/a'
const keyword = '1.json'

// module.exports.main = async function () {
async function main () {
  pushEvent('Starting scraping miss circle.')
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.on('response', async res => {
    if (res.url().match(keyword)) {
      const dt = await res.json()
      const base = dt.result
    }
  })
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.waitFor(1000)
  await browser.close()
}

main()

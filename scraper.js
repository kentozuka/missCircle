const puppeteer = require('puppeteer')
const { pushEvent } = require('./modules/line')
const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true, })
const Candidate = require('./models/candidate')

const url = 'https://2020.misscircle.jp/entries/seconds/a'
const keyword = 'https://hauptmann.age.co.jp/api/profiles/1.json'

let done = false

module.exports.main = async function () {
  pushEvent('Starting scraping miss circle.')
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  const temper = await browser.newPage()

  await page.goto('https://www.google.com')
  await page.waitFor(2000)

  page.on('response', async res => {
    if (res.url().match(keyword) && res) {
      const dt = await res.json()
      const base = dt.result
      let counter = 0
      for (const acc of base) {
        const obj = {
          application_id: acc.application_id,
          entry_id: acc.entry_id,
          block: acc.block,
          stage: acc.stage,
          public_name: acc.public_name,
          public_name_kana: acc.public_name_kana,
          university: acc.university,
          circle: acc.circle,
          grade: acc.grade,
          image: acc.image
        }
        await Candidate.updateOne({ entry_id: obj.entry_id }, obj, { upsert: true })
        await showroom(page, acc.showroom, obj.entry_id)
        await twitter(page, acc.twitter, obj.entry_id)
        await instagram(page, acc.instagram, obj.entry_id)
        counter++
        // if (base.length === counter) done = true
        if (counter === 2) done = true
      }
    }
  })

  await page.goto(url)

  while (true) {
    await temper.waitFor(2000)
    if (done) {
      await browser.close()
      mongoose.connection.close()
      return null
    }
  }
}

async function showroom(page, id, ent) {
  if (id) {
    try {
      await page.goto(`https://www.showroom-live.com/room/profile?room_id=${id}`, { waitUntil: 'networkidle2' })
      await page.waitFor(250)
      const error = await page.$x('//p[contains(text(), "Page not found")]')
      if (!error.length) {
        const followers = await page.$eval('.room-profile-info-follower', el => el.innerText.match(/\d+/g)[0])
        const three = await page.$$eval('.room-profile-status-desc', li => li.map(x => x.innerText))
        const result = { id: id, date: moment().format(), followers: followers, level: three[0], rank: three[1] }
        await Candidate.updateOne({ entry_id: ent }, { $push: { showroom: result } })
      }
    } catch {
      pushEvent(`failed while scraping showroom id ${id}`)
      return null
    }
  }
}

async function twitter(page, id, ent) {
  if (id) {
    try {
      await page.goto(`https://twitter.com/${id}`, { waitUntil: 'networkidle2' })
      await page.waitFor(250)
      const error = await page.$x('//*[contains(text(), "Caution: This account is temporarily restricted") or contains(text(), "This account doesn’t exist")] ')
      if (!error.length) {
        const following = await page.$eval(`a[href="/${id}/following"]`, el => el.innerText.match(/\d+/g).join(''))
        const followers = await page.$eval(`a[href="/${id}/followers"]`, el => el.innerText.match(/\d+/g).join(''))
        const result = { id: id, date: moment().format(), followers: followers, following: following }
        await Candidate.updateOne({ entry_id: ent }, { $push: { twitter: result } })
      }
    } catch {
      pushEvent(`failed while scraping twitter id ${id}`)
      return null
    }
  }
}

async function instagram(page, id, ent) {
  if (id) {
    try {
      await page.goto(`https://www.instagram.com/${id}/`, { waitUntil: 'networkidle2' })
      await page.waitFor(250)
      const three = await page.$$eval('.-nal3', li => li.map(x => x.innerText.match(/\d+/g).join('')))
      if (three.length) {
        const result = { id: id, date: moment().format(), followers: three[1], following: three[2], posts: three[0] }
        await Candidate.updateOne({ entry_id: ent }, { $push: { instagram: result } })
      }
    } catch {
      pushEvent(`failed while scraping instagram id ${id}`)
      return null
    }
  }
}

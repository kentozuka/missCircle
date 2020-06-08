const express = require('express')
const moment = require('moment')
const { main } = require('./scraper')
const { pushEvent } = require('./modules/line')
const Candidate = require('./models/candidate')
const cors = require('cors')

// only in development
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

// ADD THIS LINE
app.use(express.static('client/dist'))

app.get('/', (res, req) => {
  res.sendFile('../client/dist/index.html')
})

app.get('/api/data', async (req, res) => {
  res.json({ all: await Candidate.find({}, { entry_id: 1, public_name: 1, image: 1, university: 1, instagram: { $slice: -2 }, twitter: { $slice: -2 }, showroom: { $slice: -2 } }) })
})

app.get('/api/single/:id', async (req, res) => {
  res.json({ data: await Candidate.find({ entry_id: req.params.id }) })
})

app.post('/startdailyscrapingplease', (req, res) => {
  res.json({ message: 'okay' })
  const st = moment()
  main().then(() => pushEvent(`Done scraping miss circle. took ${moment().diff(st, 'minutes')} mins.`))
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

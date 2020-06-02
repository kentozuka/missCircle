const express = require('express')
const moment = require('moment')
const { main } = require('./scraper')
const { pushEvent } = require('./modules/line')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.json({ message: process.env.LINE_CHANNEL_SECRET }))
  .post('/startdailyscrapingplease', (res, req) => {
    res.json({ message: 'okay' })
    const st = moment()
    main().then(() => pushEvent(`Done scraping miss circle. took ${moment.diff(st, 'min')} mins.`))
  })
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

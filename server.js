const express = require('express')
const moment = require('moment')
const { pushEvent } = require('./modules/line')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.json({ message: 'okay' }))

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

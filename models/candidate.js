const mongoose = require('mongoose')
const Schema = mongoose.Schema

const candidateSchema = new Schema({
  application_id: Number,
  entry_id: Number,
  block: String,
  stage: String,
  public_name: String,
  public_name_kana: String,
  university: String,
  circle: String,
  grade: String,
  image: String,
  showroom: [{ id: String, date: Date, followers: String, level: String, rank: String }],
  twitter: [{ id: String, date: Date, followers: String, following: String }],
  instagram: [{ id: String, date: Date, followers: String, following: String, posts: String }]
})

const Candidate = module.exports = mongoose.model('Candidate', candidateSchema)

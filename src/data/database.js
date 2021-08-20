const MONGODB = process.env.DATABASE_URL
const mongoose = require("mongoose")

console.log(MONGODB)

const connect = () => {mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }
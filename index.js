//Modified from https://medium.com/better-programming/a-simple-crud-app-using-graphql-nodejs-mongodb-78319908f563

const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const { ApolloServer } = require("apollo-server-express")

const MONGODB_URI = `${process.env.REACT_APP_MONGODB_URI}`

const schema = require("./schema")

const url = MONGODB_URI

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connect.then(
  db => {
    console.log("Connected to server!")
  },

  err => {
    console.log(err)
  }
)

const server = new ApolloServer({
  schema: schema,
})

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use("*", cors())
server.applyMiddleware({ app })

app.get("/", function (req, res) {
  res.write("Hello World.")
  res.end()
})

const port = process.env.PORT || 4000

app.listen(port, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)

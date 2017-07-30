const express = require("express")
const chalk = require("chalk")
const app = express()

app.listen(8080, function() {
  console.log("App's running at port 8080\n")
  console.log("-> Press CTRL-C to stop\n")
})

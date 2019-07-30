const path = require("path")
const express = require("express")
const articleRoutes = require('./routes/articles')
var logger = require('./src/utils/logger')


const app = express();
const port = process.env.PORT || "8000"

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


app.use('/articles', articleRoutes)



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})


app.listen(port, () => {
  logger.info(`Listening to requests on http://localhost:${port}`)
});
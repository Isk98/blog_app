const path = require("path")
const express = require("express")
const articleRoutes = require('./routes/articles')
var logger = require('./src/utils/logger')
var {imageValidation, articleValidation} = require('./validation')


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

app.use('/image/:id', imageValidation)

// error handler
app.use(function(err, req, res, next) {
 // set locals, only providing error in development
console.log(err);
  
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
})

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('views/index'))
// }
// app.get('/articles', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'routes', 'article'));
// })


app.listen(port, () => {
  logger.info(`Listening to requests on http://localhost:${port}`)
});
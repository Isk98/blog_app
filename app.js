const path = require("path")
const express = require("express")
const articleRoutes = require('./routes/articles')
const logger = require('./src/utils/logger')
const {imageValidation, articleValidation} = require('./validation')
const request = require("request");
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const loginRoute = require('./routes/login')
const middleware = require('./tokenMiddleware')


const app = express();
const port = process.env.PORT || "8000"


// var options = { method: 'GET',
//   url: 'http://localhost:8000/api/public',
//   headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UUXhSREV6TXpORk1ESkRORVl6TTBFMk9VTXdPVVE1TUVReFFqQXpNVUk1TkRrMk4wTTJPQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1kZG92dGN5Yy5ldS5hdXRoMC5jb20vIiwic3ViIjoiM05TQ1dOaHViS1FVTW1tY3RUZndTcDNGcFdTUUJqRFdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcXVpY2tzdGFydC9hcGkiLCJpYXQiOjE1NjUzNTM2NjUsImV4cCI6MTU2NTQ0MDA2NSwiYXpwIjoiM05TQ1dOaHViS1FVTW1tY3RUZndTcDNGcFdTUUJqRFciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Umvx0TDpLR1wDjsNMglynanSLZ38hSDMybcqLV2Bc5lKftz2zLkk-Wz7YymLUk2ycGt8UEBFFH1dQt-F1Col1YG449XOJw8NOXdYfe5rf7isyI73wbg697xUP38bwb5wn4WA6nEbwaqQvkrTfGKQ8UVo9o-_LOVnRysnfpiXwMrDKFVsip261FbizsoS-UcVnFJWLJnCqPNV549KcGS8xSMAxtGwM83W2yAqumt5HmJT3E6g-QHtBvt0LK7aXo1pV950NxczNKfvc-U86Zf3Ndqu7pc15U0xTbrrC6lcMb88ig3y3JpYFjA7uCPoqwA_EGCwbF04x2ZTrFq4FV8ixg' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
app.use('/login', loginRoute);
//app.use('/', middleware.checkToken);


var checkJwt = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-ddovtcyc.eu.auth0.com/.well-known/jwks.json'
}),
audience: 'https://quickstart/api/login',
issuer: 'https://dev-ddovtcyc.eu.auth0.com/',
algorithms: ['RS256']
})

// app.use(checkJwt);
// app.get('/authorized', function (req, res) {
//   res.send('Secured Resource');
// })
// app.get('/api/public', function(req, res) {
//   return res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   })
// })

// app.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   })
// })


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


// app.use('/articles', articleRoutes)

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.get("/", (req, res) => {
//   res.render("index", { title: "Home" })
// })

// app.use('/image/:id', imageValidation)

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
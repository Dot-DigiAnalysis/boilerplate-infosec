const express = require('express');
const app = express();
// const express = require('express')
const helmet = require('helmet')

// const app = express()
app.use(helmet())


let ninetyDaysInSeconds = 90*24*60*60
app.use(helmet.hsts({maxAge:90*24*60*60 , force: true}))
app.use(helmet.dnsPrefetchControl())
app.use(helmet.noCache())

app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }} ))















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

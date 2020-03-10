const express = require( 'express' );

const bookRoutes = require('./routes/books')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Listen to port 3000
app.listen(3002);
console.log('Server started on port 3002');

// Static file access
app.use( express.static( './public' ) );


// Fire controllers
bookRoutes( app );

app.get('/', function(req, res, db) {
  res.send('TO DZIALA')
})


module.exports == { app };

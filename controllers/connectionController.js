const mysql = require( 'mysql' );
// const multer = require('multer');

// const upload = multer().none();

let onlineStatus = false;

//Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bookservice2'
});

// Connect
db.connect( ( err ) => {
    if( err ) throw err;
    // console.log( 'Connected' );
    onlineStatus = true;
});

module.exports = {
  db: db,
  onlineStatus: onlineStatus
}//module.exports end

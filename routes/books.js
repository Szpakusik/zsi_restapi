const Queries = require('./../utils/queries')
const connectionController = require('./../controllers/connectionController')

const db = connectionController.db

module.exports = function( app ){

    app.get( '/books', ( req, res )=>{

        let sqlOffersQuery;
        let searchType;
        res.send('HUJEC')
        // res.send(Queries.getAllBooks).status(200)

        let queryExistingUserOut = db.query( Queries.getAllBooks, ( err, foundOffersResult ) => {
            if( err ) throw err;
            else{
                // res.send(foundOffersResult)
            }
        })

        // queryController.findOffers(sqlOffersQuery, req, res, db, req.query.searchList, searchType);
        
    });
}
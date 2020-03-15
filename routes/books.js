const Queries = require('./../utils/queries');
const connectionController = require('./../controllers/connectionController');
const unify = require('./../utils/offers')

const db = connectionController.db

module.exports = function( app ){

    app.get( '/books', ( req, res )=>{

        let queryExistingUserOut = db.query( Queries.getAllBooks, ( err, foundOffersResult ) => {
            if( err ) throw err;
            else{
                res.json(foundOffersResult)
            }
        })

    });

    app.get( '/offers', ( req, res )=>{
        
        let queryExistingUserOut = db.query( Queries.getAllBooks, ( err, foundOffersResult ) => {
            if( err ) throw err;
            else{
                const result = unify( foundOffersResult );
                res.json(result)
            }
        })
        
    });

    app.get( '/offers/user/:username', ( req, res )=>{

        let queryExistingUserOut = db.query( Queries.makeGetUserBookSQL( req.params.username ), ( err, foundOffersResult ) => {
            if( err ) throw err;
            else{
                res.json(unify( foundOffersResult) )
            }
        })

    });

    app.get( '/offers/class/:class', ( req, res )=>{

        let queryExistingUserOut = db.query( Queries.makeGetClassBookSQL( req.params.class ), ( err, foundOffersResult ) => {
            if( err ) throw err;
            else{
                res.json(unify( foundOffersResult) )
            }
        })

    });

    app.get( '/offers/subject', ( req, res )=>{

        let queryExistingUserOut;
         
        if( Object.keys(req.query).includes('subjects') && Object.keys(req.query).includes('class') ){

            queryExistingUserOut = db.query( Queries.makeGetBySubjectBookSQL( req.query.subjects, req.query.class ), ( err, foundOffersResult ) => {
                if( err ) throw err;
                else{
                    res.json( unify( foundOffersResult ) )
                }
            })
            
        }
        else{
            res.status(406).send("Wrong query params")
        }


    });

    
}
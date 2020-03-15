const moment = require('moment')

class Offer {
  constructor( foundOffer ){
    this.id = foundOffer.id;
    this.username = foundOffer.username;
    this.num = foundOffer.num;
    this.email = foundOffer.email;
    this.description = foundOffer.description;
    this.class = foundOffer.class;
    this.subjects = [];
    this.subjects.push( foundOffer.subject );
    this.links = [];
    this.links.push( foundOffer.link )
    this.titles = [];
    this.titles.push( foundOffer.title )
    this.priceFrom = foundOffer.price_from
    this.priceTo = foundOffer.price_to
    this.addDate = moment( new Date(foundOffer.add_date) ).locale('pl').fromNow();
  }
}

const unify = (foundOffersResult) => {

    let offersToShow = [];

    for ( foundOffer of foundOffersResult ) {

        let alreadyinTable = 0;

        for( let i = 0; i < offersToShow.length; i++ ){

          if ( foundOffer.id != offersToShow[i].id )
            continue;

          else if ( foundOffer.id == offersToShow[i].id ){

            alreadyinTable = 1;

            if ( !offersToShow[i].links.includes( foundOffer.link ) )
              offersToShow[i].links.push( foundOffer.link );

            if ( !offersToShow[i].subjects.includes( foundOffer.subject ) )
              offersToShow[i].subjects.push( foundOffer.subject );

            if ( !offersToShow[i].titles.includes( foundOffer.title  ) )
              offersToShow[i].titles.push( foundOffer.title );

          }

          else console.log("Sth went wrong");

        }

        if (alreadyinTable == 0)
          offersToShow.push( new Offer( foundOffer ) );
//                console.log(offersToShow);

      }//For transformacja end
    
    return offersToShow;

}

module.exports = unify
const Queries = {};

Queries.getAllBooks = `SELECT users.username, users.num, users.email, offers.description, offers.price_from, offers.price_to, book_type.subject, photos.link, offers.id, book_type.class, book_type.title, offers.add_date FROM
                                offers  INNER JOIN users ON offers.user_id = users.id
                                        INNER JOIN photos ON photos.offer_id = offers.id
                                        INNER JOIN sets ON sets.offer_id = offers.id
                                        RIGHT JOIN book_type ON book_type.id = sets.book_type_id
                                        WHERE offers.active = 1
                                        AND photos.active = 1
                                        ORDER BY offers.id DESC LIMIT 200`;



Queries.makeGetUserBookSQL = (login)=>{

        return `SELECT users.username, users.num, users.email, offers.description, offers.price_from, offers.price_to, book_type.subject, photos.link, offers.id, book_type.class, book_type.title, offers.add_date, offers.active FROM
        offers  INNER JOIN users ON offers.user_id = users.id
                INNER JOIN photos ON photos.offer_id = offers.id
                INNER JOIN sets ON sets.offer_id = offers.id
                INNER JOIN book_type ON book_type.id = sets.book_type_id
                WHERE sets.offer_id IN
                (SELECT sets.offer_id FROM sets INNER JOIN book_type ON sets.book_type_id = book_type.id
                WHERE users.username = "${login}" )
                AND photos.active = 1` ;

}                                       

Queries.makeGetClassBookSQL = ( classNumber )=>{
        return `SELECT users.username, users.num, users.email, offers.description, offers.price_from, offers.price_to, book_type.subject, photos.link, offers.id, book_type.class, book_type.title, offers.add_date FROM
                offers  INNER JOIN users ON offers.user_id = users.id
                        INNER JOIN photos ON photos.offer_id = offers.id
                        INNER JOIN sets ON sets.offer_id = offers.id
                        RIGHT JOIN book_type ON book_type.id = sets.book_type_id
                        WHERE offers.active = 1
                        AND photos.active = 1
                        AND book_type.class = ${ classNumber }`
}

Queries.makeGetBySubjectBookSQL = ( subjects, classNumber )=>{

        let subjectListString
        if(subjects) subjectListString = subjects.replace(/ /gi, '" OR book_type.subject = "');
        
        return `SELECT users.username, users.num, users.email, offers.description, offers.price_from, offers.price_to, book_type.subject, photos.link, offers.id, book_type.class, book_type.title, offers.add_date FROM
                offers  INNER JOIN users ON offers.user_id = users.id
                        INNER JOIN photos ON photos.offer_id = offers.id
                        INNER JOIN sets ON sets.offer_id = offers.id
                        RIGHT JOIN book_type ON book_type.id = sets.book_type_id
                        WHERE sets.offer_id IN
                        (SELECT sets.offer_id FROM sets INNER JOIN book_type ON sets.book_type_id = book_type.id
                        WHERE book_type.subject = "${subjectListString}" )
                        AND offers.active = 1
                        AND photos.active = 1
                        AND book_type.class = ${ classNumber }` ;
}

module.exports = Queries
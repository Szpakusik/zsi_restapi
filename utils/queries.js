const Queries = {};

Queries.getAllBooks = `SELECT users.username, users.num, users.email, offers.description, offers.price_from, offers.price_to, book_type.subject, photos.link, offers.id, book_type.class, book_type.title, offers.add_date FROM
                                offers  INNER JOIN users ON offers.user_id = users.id
                                        INNER JOIN photos ON photos.offer_id = offers.id
                                        INNER JOIN sets ON sets.offer_id = offers.id
                                        RIGHT JOIN book_type ON book_type.id = sets.book_type_id
                                        WHERE offers.active = 1
                                        AND photos.active = 1
                                        ORDER BY offers.id DESC LIMIT 200`

module.exports = Queries
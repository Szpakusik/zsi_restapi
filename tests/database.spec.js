const axios = require('axios');

describe("Database actions", ()=>{

    it('Should be able to GET all books', async ()=>{

        let resStatus;
        expect.assertions(1)

        await axios.get('http://localhost:3002/books')
        .then( async (response) => {
            resStatus = await response.status
        })
        .catch( async (error) => {
            resStatus = 404
        })

        expect(resStatus).toBe(200);

    })

})
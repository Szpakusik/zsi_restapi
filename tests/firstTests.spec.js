const axios = require('axios');

describe('Few first tests', ()=>{

    it('True should always be true', ()=>{
        expect(true).toBe(true);
    })

    it('Should send "OK" as a response at localhost/ ', async ()=>{

        let resStatus;
        expect.assertions(1)

        await axios.get('http://localhost:3002')
        .then( async (response) => {
            resStatus = await response.status
            // console.log(response)
        })
        .catch( async (error) => {
            console.log(error);
            resStatus = 404
        })

        expect(resStatus).toBe(200)

    })

})
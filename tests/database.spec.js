const axios = require('axios');

const data = require('./../utils/data')
const unify = require('./../utils/offers')

const address = 'http://localhost:3002/'

describe("Router", ()=>{

    it('Should be able to GET "/books"', async ()=>{

        let resStatus;
        expect.assertions(1)

        await axios.get(address+"books")
        .then( async (response) => {
            resStatus = await response.status
        })
        .catch( async (error) => {
            resStatus = 404
        })

        expect(resStatus).toBe(200);

    })

    it("Should be able to GET '/offers'", async ()=>{
        expect.assertions(1)
        let data;

        await axios.get(address+"offers")
        .then( async (response) => {
            resStatus = await response.status;
        })
        .catch( async (error) => {
            resStatus = 404
        })
        expect(resStatus).toBe(200);
    })

    it("Should be able to GET '/offers/user/szpakusik'", async ()=>{
        expect.assertions(1)
        let data;

        await axios.get(address+"offers/user/szpakusik")
        .then( async (response) => {
            resStatus = await response.status;
        })
        .catch( async (error) => {
            resStatus = 404
        })
        expect(resStatus).toBe(200);
    })

    it("Should be able to GET '/offers/class/1' ", async ()=>{
        expect.assertions(1)
        let data;

        await axios.get(address+"offers/class/1")
        .then( async (response) => {
            resStatus = await response.status;
        })
        .catch( async (error) => {
            resStatus = 404
        })
        expect(resStatus).toBe(200);
    })

    it("Should return only 1'st class offers from '/offers/class/1' ", async ()=>{
        expect.assertions(1)
        let data;
        let isClassCorrect = true;

        await axios.get(address+"offers/class/1")
        .then( async (response) => {
            resStatus = await response.status;
            data = response.data
        })
        .catch( async (error) => {
            resStatus = 404
        })

        data.forEach( offer => {
            
            if( offer.class !== "1" ) isClassCorrect = false
            
        });

        expect(isClassCorrect).toBe(true);
    })

    it("Should be able to GET '/offers/subject?subjects=german&class=4' ", async ()=>{
        expect.assertions(1)
        let data;

        await axios.get(address+"offers/subject?subjects=german&class=4")
        .then( async (response) => {
            resStatus = await response.status;
            data = response.data;
        })
        .catch( async (error) => {
            resStatus = 404
        })
        expect(resStatus).toBe(200);
    })

    it("Should NOT be able to GET '/offers/subject' without query params ", async ()=>{
        expect.assertions(1)

        await axios.get(address+"offers/subject")
        .then( async (response) => {
            resStatus = await response.status;
        })
        .catch( async (error) => {
            resStatus = await error.response.status
        })
        expect(resStatus).toBe(406);
    })

    it("Should return only german 4th class '/offers/subject?subjects=german&class=4' ", async ()=>{

        expect.assertions(1)
        let data;
        let onlyRequestedOffer;
 
        await axios.get(address+"offers/subject?subjects=german&class=4")
        .then( async (response) => {
            resStatus = await response.status;
            data = response.data
        })
        .catch( async (error) => {
            resStatus = 404
            console.log(resStatus)
        })

        if( data ) data.forEach( offer => {

            onlyRequestedOffer = true;
            // console.log( offer.subjects.includes("german") && offer.class === "4" )
            if( !( offer.subjects.includes("german") && offer.class === "4" ) ) {
             
                onlyRequestedOffer = false;

            }
            
        });

        expect(onlyRequestedOffer).toBe(true);
    })

})

describe('Separate functions', ()=>{

    describe('unify function', ()=>{
        
        it('Should import an array of 58 SQL results', ()=>{
            const length = data.length;
            expect( length ).toBe(58);
        })
        
        it('"unify" Should return an array of 7 offers', ()=>{
            const result = unify(data);
            expect( result.length ).toBe(7);
        })

    })

})
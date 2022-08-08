
const express = require('express')
const router = express.Router()
const testM = require('../models/testModel')

router.get('/', async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization']
        console.log('bearerHeader: ', bearerHeader)

        if (typeof bearerHeader !== 'undefined' && bearerHeader !== '') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            console.log('bearerToken: ', bearerToken)
            if (bearerToken === 'JUMP-AUTH-TOKEN') {
                //checking if key exists in req body, else cache miss
                if (req.body.name === 'usman') {
                    console.log("cache hit")
                    const resp = await testM.find().catch(e => console.log("error occured: ", e))
                    //get the data for this key, and return data
                    res.json(resp)
                }
                else {

                    console.log("cache miss")
                    const testValues = await testM.find().catch(e => console.log("error occured: ", e))
                    testValues.forEach(async (testValue) => {
                        let randomString = Math.random().toString(36).substring(2, 7);
                        console.log('random string: ', randomString);
                        let update = { name: randomString }
                        console.log("testValuesid: ", testValue.id)
                        //update db with this random string
                        await testM.findOneAndUpdate({ _id: testValue.id }, update).
                            catch(e => {
                                console.log("error occured: ", e)
                            })
                    })
                    const resp = await testM.find()

                    //return response
                    res.json(resp)

                }
            }
            else {

                res.sendStatus(403)
            }
        }
        else {

            res.sendStatus(403)
        }

    } catch (error) {
        console.log('error: ', error)
    }

})
router.post('/', async (req, res) => {

    const testTable = new testM({
        name: "Usman",
        expired: "NOT_EXPIRED"
    })
    await testTable.save()
    console.log('testTable values:', testTable)
    const resp = await testM.find().catch(e => console.log("error occured: ", e))
    res.json(resp)
})
module.exports = router
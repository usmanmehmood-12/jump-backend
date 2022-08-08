
const testM = require('../models/testModel')

const schedule = require('node-schedule')

const rule = new schedule.RecurrenceRule()
rule.second = 30;
//TTL Cron Job/ service to update expiry time
exports.ttlStatusUpdate = () => {
    schedule.scheduleJob(rule, async () => {//'* * * * * *'

        console.log("CRON JOB INVOKE")
        const update = { expired: 'EXPIRED' }
        const testValues = await testM.find()
        testValues.forEach(async (testValue) => {
            let test = await testM.findOneAndUpdate({ _id: testValue.id }, update).catch(e => console.log("error occured: ", e))
            console.log("testtt: ", test)
        })
    })
}
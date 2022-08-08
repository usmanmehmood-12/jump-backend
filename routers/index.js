module.exports = function (app) {
    app.use('/endpoint', require('./endpoint'))
}

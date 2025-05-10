const express = require("express")
const morgan = require("morgan")
const helmet = require('helmet')
const compression = require("compression")

const app = express()

//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//init db
require('./dbs/init.mongodb')

const { checkOverLoad } = require("./helpers/check.connect")
checkOverLoad()

//init routes
app.get('/',(req,res,next) => {
    const str = "Hello fantipjs"
    return res.status(200).json({
        msg: 'Welcome tip js',
        meta: str.repeat(1000)
    })
})

//handling errors

module.exports = app
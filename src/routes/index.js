const express = require('express')
const router = express.Router()

router.use('/v1/api', require('./access'))
// router.get('/',(req,res,next) => {
//     const str = "Hello fantipjs"
//     return res.status(200).json({
//         msg: 'Welcome tip js',
//     })
// })

module.exports = router
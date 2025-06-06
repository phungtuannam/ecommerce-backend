const express = require('express')
const { apiKey,permisssion } = require('../auth/checkAuth')
const router = express.Router()

//check apiKey
router.use(apiKey)
//check permission
router.use(permisssion('0000'))

router.use('/v1/api', require('./access'))

module.exports = router
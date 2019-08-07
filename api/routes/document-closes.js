const express = require('express')
const router = express.Router()
const DocumentCloses = require('../controllers/document-closes')

router.post('/', DocumentCloses.post)

module.exports = router

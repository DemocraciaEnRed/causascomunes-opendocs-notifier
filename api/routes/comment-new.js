const express = require('express')
const router = express.Router()
const CommentNew = require('../controllers/comment-new')

router.post('/', CommentNew.post)

module.exports = router

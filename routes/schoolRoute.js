const express = require('express')
const router = express.Router()
const { getPage, addSchool, getSchool } = require("../controllers/schoolController")

router.get('/', getPage)
router.post('/addSchool', addSchool)
router.get('/getSchool', getSchool)

module.exports = router

const router = require("express").Router()
const { getAllSuratByType, createSuratByType, updateSuratByType, getAllSuratTypes } = require('../../controllers/surats/suratByTypeControllers')
const { verifyToken } = require('../../middleware/VerifyToken')

router.get('/type/', verifyToken, getAllSuratByType)
router.post('/type', verifyToken, createSuratByType)
router.put('/type/update', verifyToken, updateSuratByType)
router.get('/all', verifyToken, getAllSuratTypes)

module.exports = router
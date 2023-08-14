const router = require("express").Router()
const { getSuratKematian, createSuratKematian, updateSuratKematian } = require('../../controllers/surats/ketKematianControllers')
const { verifyToken } = require('../../middleware/VerifyToken')

router.get('/kematian', verifyToken, getSuratKematian)
router.post('/kematian', verifyToken, createSuratKematian)
router.put('/kematian/update', verifyToken, updateSuratKematian)

module.exports = router
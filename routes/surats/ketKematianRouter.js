const router = require("express").Router()
const { getSuratKematian, createSuratKematian, updateSuratKematian } = require('../../controllers/surats/ketKematianControllers')
const { verifyToken } = require('../../middleware/VerifyToken')

router.get('/kematian', getSuratKematian)
router.post('/kematian', createSuratKematian)
router.put('/kematian/update', updateSuratKematian)

module.exports = router
const router = require("express").Router()
const { getSuratKematian, createSuratKematian } = require('../../controllers/surats/ketKematianControllers')
const { verifyToken } = require('../../middleware/VerifyToken')

router.get('/kematian', getSuratKematian)
router.post('/kematian', createSuratKematian)

module.exports = router
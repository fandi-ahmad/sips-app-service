const router = require("express").Router()
const { getAllSuratKetUsaha, createSuratKetUsaha, updateSuratKetUsaha, deleteSuratKetUsaha } = require('../../controllers/surats/ketUsahaControllers')
const { getAllSuratKetDomUsaha, createSuratKetDomUsaha } = require('../../controllers/surats/ketDomUsahaControllers')
const { verifyToken } = require('../../middleware/VerifyToken')

router.get('/usaha', verifyToken, getAllSuratKetUsaha)
router.post('/usaha', verifyToken, createSuratKetUsaha)
router.put('/usaha/update', verifyToken, updateSuratKetUsaha)
router.delete('/usaha/delete', verifyToken, deleteSuratKetUsaha)
router.get('/usaha/domisili', verifyToken, getAllSuratKetDomUsaha)
router.post('/usaha/domisili', verifyToken, createSuratKetDomUsaha)

module.exports = router
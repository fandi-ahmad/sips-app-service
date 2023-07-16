const router = require("express").Router()
const { getAllSuratKetUsaha, createSuratKetUsaha, updateSuratKetUsaha, deleteSuratKetUsaha } = require('../../controllers/surats/ketUsahaControllers')
const { getAllSuratKetDomUsaha, createSuratKetDomUsaha } = require('../../controllers/surats/ketDomUsahaControllers')

router.get('/usaha', getAllSuratKetUsaha)
router.post('/usaha', createSuratKetUsaha)
router.put('/usaha/update', updateSuratKetUsaha)
router.delete('/usaha/delete', deleteSuratKetUsaha)
router.get('/usaha/domisili', getAllSuratKetDomUsaha)
router.post('/usaha/domisili', createSuratKetDomUsaha)

module.exports = router
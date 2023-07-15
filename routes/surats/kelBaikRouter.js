const router = require("express").Router()
const { getAllSuratKelBaik, createSuratKelBaik, updateSuratKelBaik, deleteSuratKelBaik } = require('../../controllers/surats/kelBaikControllers')

router.get('/kelbaik', getAllSuratKelBaik)
router.post('/kelbaik', createSuratKelBaik)
router.put('/kelbaik/update', updateSuratKelBaik)
router.delete('/kelbaik/delete', deleteSuratKelBaik)

module.exports = router
const router = require("express").Router()
const { getAllSuratKetUsaha, createSuratKetUsaha, updateSuratKetUsaha, deleteSuratKetUsaha } = require('../../controllers/surats/ketUsahaControllers')

router.get('/usaha', getAllSuratKetUsaha)
router.post('/usaha', createSuratKetUsaha)
router.put('/usaha/update', updateSuratKetUsaha)
router.delete('/usaha/delete', deleteSuratKetUsaha)

module.exports = router
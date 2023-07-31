const router = require("express").Router()
const { getAllSuratByType, createSuratByType, updateSuratByType, getAllSuratTypes } = require('../../controllers/surats/suratByTypeControllers')

router.get('/type/', getAllSuratByType)
router.post('/type', createSuratByType)
router.put('/type/update', updateSuratByType)
router.get('/all', getAllSuratTypes)

module.exports = router
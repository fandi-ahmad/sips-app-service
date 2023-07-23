const router = require("express").Router()
const { getAllSuratByType, createSuratByType, updateSuratByType } = require('../../controllers/surats/suratByTypeControllers')

router.get('/type/', getAllSuratByType)
router.post('/type', createSuratByType)
router.put('/type/update', updateSuratByType)

module.exports = router
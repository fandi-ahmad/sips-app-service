const router = require("express").Router()
const { getAllSuratByType, createSuratByType } = require('../../controllers/surats/suratByTypeControllers')

router.get('/type/', getAllSuratByType)
router.post('/type', createSuratByType)

module.exports = router
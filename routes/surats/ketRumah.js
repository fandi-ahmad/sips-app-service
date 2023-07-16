const router = require("express").Router()
const { getAllSuratRumah, createSuratRumah } = require('../../controllers/surats/ketRumahControllers')

router.get('/rumah', getAllSuratRumah)
router.post('/rumah', createSuratRumah)

module.exports = router
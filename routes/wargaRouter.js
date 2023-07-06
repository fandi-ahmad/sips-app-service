const router = require("express").Router()
const { getAllWarga, createWarga, deleteWarga } = require('../controllers/wargaControllers')

router.get('/warga', getAllWarga)
router.post('/warga', createWarga)
router.delete('/warga/:id', deleteWarga)

module.exports = router
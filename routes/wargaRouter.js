const router = require("express").Router()
const { getAllWarga, createWarga, deleteWarga, createWargaPelapor, getWargaById } = require('../controllers/wargaControllers')

router.get('/warga', getAllWarga)
router.post('/warga', createWarga)
router.post('/warga/pelapor', createWargaPelapor)
router.delete('/warga/:id', deleteWarga)
router.get('/warga/select', getWargaById)

module.exports = router
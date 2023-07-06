const router = require("express").Router()
const pegawaiRouter = require('./pegawaiRouter')
const wargaRouter = require('./wargaRouter')
const { getAllPegawai, pegawaiView } = require('../controllers/pegawaiControllers')
const { getAllWarga } = require('../controllers/wargaControllers')

router.use('/api/v1', pegawaiRouter)
router.use('/api/v1', wargaRouter)

router.get('/dashboard', getAllPegawai)
router.get('/warga', getAllWarga)
router.get('/pegawai', pegawaiView)

module.exports = router
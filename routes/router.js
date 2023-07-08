const router = require("express").Router()
const pegawaiRouter = require('./pegawaiRouter')
const wargaRouter = require('./wargaRouter')
const { getAllPegawai } = require('../controllers/pegawaiControllers')
const { getAllWarga } = require('../controllers/wargaControllers')
const { getAllSurat, createSurat, updateSurat } = require('../controllers/suratControllers')

router.use('/api/v1', pegawaiRouter)
router.use('/api/v1', wargaRouter)

router.get('/', (req, res) => {
    res.render('dashboard')
})
router.get('/pegawai', getAllPegawai)
router.get('/warga', getAllWarga)

router.get('/surat', getAllSurat)
router.post('/api/v1/surat', createSurat)
router.post('/api/v1/surat/update', updateSurat)

module.exports = router
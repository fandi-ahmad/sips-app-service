const router = require("express").Router()
const pegawaiRouter = require('./pegawaiRouter')
const wargaRouter = require('./wargaRouter')
const userRouter = require('./userRouter')
const { getAllPegawai, viewPegawai } = require('../controllers/pegawaiControllers')
const { getAllWarga } = require('../controllers/wargaControllers')
const { getAllSurat, createSurat, updateSurat } = require('../controllers/suratControllers')
const { viewLogin } = require('../controllers/authControllers')
const { verifyToken } = require('../middleware/VerifyToken')

// ===== SURAT ROUTER =====
const kelBaikRouter = require('./surats/kelBaikRouter')
const ketUsahaRouter = require('./surats/ketUsahaRouter')
const ketRumah = require('./surats/ketRumah')

router.use('/api/v1', pegawaiRouter)
router.use('/api/v1', wargaRouter)
router.use('/api/v1', userRouter)

router.use('/api/v1/surat', kelBaikRouter)
router.use('/api/v1/surat', ketUsahaRouter)
router.use('/api/v1/surat', ketRumah)

router.get('/', (req, res) => {
    res.render('dashboard')
})
router.get('/pegawai', viewPegawai)
router.get('/warga', getAllWarga)
router.get('/login', viewLogin)

router.get('/surat', getAllSurat)
router.post('/api/v1/surat', createSurat)
router.post('/api/v1/surat/update', updateSurat)

module.exports = router
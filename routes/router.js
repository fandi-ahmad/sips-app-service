const router = require("express").Router()
const pegawaiRouter = require('./pegawaiRouter')
const wargaRouter = require('./wargaRouter')
const userRouter = require('./userRouter')
// const { getAllPegawai } = require('../controllers/pegawaiControllers')
// const { getAllWarga } = require('../controllers/wargaControllers')
const { getAllSurat, createSurat, updateSurat } = require('../controllers/suratControllers')
const { viewLogin } = require('../controllers/authControllers')
const { verifyToken } = require('../middleware/VerifyToken')

// ===== SURAT ROUTER =====
const kelBaikRouter = require('./surats/kelBaikRouter')
const ketUsahaRouter = require('./surats/ketUsahaRouter')
const ketRumah = require('./surats/ketRumah')
const suratByTYpe = require('./surats/suratByTypeRoute')
const suratKematian = require('./surats/ketKematianRouter')

// ===== DATA DASHBOARD ONLY =====
const { getDataDashboard } = require('../controllers/dashboardController')

// ===== VIEWS ROUTER =====
const { viewPegawai, viewWarga, viewSuratBaik, viewSuratUsaha } = require('../controllers/viewControllers')

router.use('/api/v1', pegawaiRouter)
router.use('/api/v1', wargaRouter)
router.use('/api/v1', userRouter)
router.get('/api/v1/dashboard', verifyToken, getDataDashboard)

router.use('/api/v1/surat', kelBaikRouter)
router.use('/api/v1/surat', ketUsahaRouter)
router.use('/api/v1/surat', ketRumah)
router.use('/api/v1/surat', suratByTYpe)
router.use('/api/v1/surat', suratKematian)

router.get('/', (req, res) => {
    res.render('dashboard')
})
router.get('/pegawai', viewPegawai)
router.get('/warga', viewWarga)
router.get('/login', viewLogin)

// surat
router.get('/surat/berkelakuan-baik', viewSuratBaik)
// router.get('/surat/name=surat%20keterangan%20belum%20memiliki%20rumah', viewSuratBaik)
router.get('/surat/usaha', viewSuratUsaha)
// type?name=surat%20keterangan%20belum%20memiliki%20rumah

router.get('/surat', getAllSurat)
router.post('/api/v1/surat', createSurat)
router.post('/api/v1/surat/update', updateSurat)

module.exports = router
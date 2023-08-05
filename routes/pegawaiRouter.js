const router = require("express").Router()
const { createPegawai, updatePegawai, deletePegawai, getAllPegawai, getPegawaiActive } = require('../controllers/pegawaiControllers')
const { verifyToken } = require('../middleware/VerifyToken')

router.get('/pegawai', verifyToken, getAllPegawai)
router.get('/pegawai/active', verifyToken, getPegawaiActive)
router.post('/pegawai', verifyToken, createPegawai)
router.put('/pegawai/update', verifyToken, updatePegawai)
router.delete('/pegawai/delete/:id', verifyToken, deletePegawai)

module.exports = router
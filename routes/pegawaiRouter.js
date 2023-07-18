const router = require("express").Router()
const { createPegawai, updatePegawai, deletePegawai, getAllPegawai } = require('../controllers/pegawaiControllers')
const { verifyToken } = require('../middleware/VerifyToken')

router.get('/pegawai', verifyToken, getAllPegawai)
router.post('/pegawai', verifyToken, createPegawai)
router.put('/pegawai/update', verifyToken, updatePegawai)
router.delete('/pegawai/delete', verifyToken, deletePegawai)

module.exports = router
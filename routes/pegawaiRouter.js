const router = require("express").Router()
const { createPegawai, updatePegawai, deletePegawai, getAllPegawai, getPegawaiActive } = require('../controllers/pegawaiControllers')
const { verifyToken } = require('../middleware/VerifyToken')

router.get('/pegawai', getAllPegawai)
router.get('/pegawai/active', getPegawaiActive)
router.post('/pegawai', createPegawai)
router.put('/pegawai/update', updatePegawai)
router.delete('/pegawai/delete/:id', deletePegawai)

module.exports = router
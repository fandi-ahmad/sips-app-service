const router = require("express").Router()
const { createPegawai, updatePegawai, deletePegawai, getAllPegawai } = require('../controllers/pegawaiControllers')
const { verifyToken } = require('../middleware/VerifyToken')

router.get('/pegawai', getAllPegawai)
router.post('/pegawai', createPegawai)
router.put('/pegawai/update', updatePegawai)
router.delete('/pegawai/delete/:id', deletePegawai)

module.exports = router
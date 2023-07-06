const router = require("express").Router()
const { getAllPegawai, createPegawai, updatePegawai, deletePegawai } = require('../controllers/pegawaiControllers')

router.get('/pegawai', getAllPegawai)
router.post('/pegawai', createPegawai)
router.put('/pegawai', updatePegawai)
router.delete('/pegawai/delete/:id', deletePegawai)

module.exports = router
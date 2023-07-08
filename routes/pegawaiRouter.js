const router = require("express").Router()
const { createPegawai, updatePegawai, deletePegawai } = require('../controllers/pegawaiControllers')

router.post('/pegawai', createPegawai)
router.post('/pegawai/update', updatePegawai)
router.post('/pegawai/delete', deletePegawai)

module.exports = router
const { Pegawai, Warga } = require('../models')
const { getSuratQuery } = require('./surats/suratByTypeControllers')

const getApi = () => {
    const api = process.env.APP_API_URL;
    return api
}

const viewPegawai = async (req, res) => {
    try {
        const data = await Pegawai.findAll()
        res.render('pegawai')
        res.render('pegawai', {pegawais: data, apiUrl: getApi()})
    } catch (error) {
        res.render('errorPage')
    }
}

const viewWarga = async (req, res) => {
    try {
        const data = await Warga.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        // res.json(result)
        res.render('warga', {status: 'okey'})
    } catch (error) {
        res.render('errorPage')
    }
}


// surat/berkelakuan-baik
const viewSuratBaik = async (req, res) => {
    try {
        const dataSurat = await getSuratQuery('surat keterangan berkelakuan baik')
        console.log(dataSurat)
        // res.json({status: 'ok', data: dataSurat})
        res.render('surats/skbbaik', {apiUrl: getApi(), dataSurat: dataSurat})
    } catch (error) {
        res.render('errorPage')
    }
}

// surat/usaha
const viewSuratUsaha = async (req, res) => {
    try {
        res.render('surats/skusaha')
    } catch (error) {
        res.render('errorPage')
    }
}

module.exports = { viewPegawai, viewWarga, viewSuratBaik, viewSuratUsaha }
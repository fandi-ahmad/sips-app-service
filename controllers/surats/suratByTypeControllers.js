// surat keterangan belum memiliki rumah
// surat keterangan tidak mampu (sktm) berobat / umum
// surat keterangan belum bekerja
// surat keterangan belum menikah

const { Op } = require('sequelize');
const { Surat, sequelize, Warga } = require('../../models')

const getSuratQuery = async (name, id, search) => {
    let query = /*sql*/ `
        SELECT 
            surats.id, surats.no_surat, surats.no_surat_number, surats.nama_surat, surats.maksud,
            surats.createdAt, surats.id_pegawai, surats.id_warga, surats.isi_surat,
            surats.no_surat_pengantar, surats.tgl_surat_pengantar, surats.id_surat_khusus, surats.variabel,

            pegawais.nama AS nama_pegawai, pegawais.jabatan, pegawais.nip,

            w.nama AS nama_warga, w.nik, w.jenis_kelamin, w.tempat_lahir, w.tanggal_lahir,
            w.pekerjaan, w.kewarganegaraan, w.status, w.agama, w.alamat, w.rt_rw

        FROM surats 
        JOIN pegawais ON (surats.id_pegawai = pegawais.id)
        JOIN wargas AS w ON (surats.id_warga = w.id)
    `;
    if (name) {
        query += /*sql*/` WHERE surats.nama_surat = "${name}"`;
    }

    if (id) {
        query += ` AND surats.id = "${id}"`;
    }

    if (search) {
        query += /*sql*/ `
            WHERE 
                pegawais.nama LIKE '%${search}%' OR
                w.nama LIKE '%${search}%' OR
                surats.no_surat LIKE '%${search}%';
        `
    }

    const dataSurat = await sequelize.query(query)

    const formattedData = dataSurat[0].map((item) => {
        return {
            id: item.id,
            no_surat: item.no_surat,
            no_surat_number: item.no_surat_number,
            variabel: item.variabel,
            nama_surat: item.nama_surat,
            maksud: item.maksud,
            isi_surat: item.isi_surat,
            no_surat_pengantar: item.no_surat_pengantar,
            tgl_surat_pengantar: item.tgl_surat_pengantar,
            createdAt: item.createdAt,
            id_surat_khusus: item.id_surat_khusus,
            pegawai: {
                id_pegawai: item.id_pegawai,
                nama: item.nama_pegawai,
                jabatan: item.jabatan,
                nip: item.nip
            },
            warga: {
                id_warga: item.id_warga,
                nama: item.nama_warga,
                nik: item.nik,
                jenis_kelamin: item.jenis_kelamin,
                tempat_lahir: item.tempat_lahir,
                tanggal_lahir: item.tanggal_lahir,
                pekerjaan: item.pekerjaan,
                kewarganegaraan: item.kewarganegaraan,
                status: item.status,
                agama: item.agama,
                alamat: item.alamat,
                rt_rw: item.rt_rw
            },
        };
    });
    return formattedData
}

const getAllSuratTypes = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const nama_surat = req.query.nama_surat

        if (nama_surat) {
            const { count, rows } = await Surat.findAndCountAll({
                where: {
                    nama_surat: nama_surat
                },
                offset: (currentPage - 1) * limit,
                limit: limit
            })

            const result = {
                status: 'ok',
                page: currentPage,
                limit: limit,
                total_page: Math.ceil(count/limit),
                total_data: count,
                data: rows,
            }
            res.json(result)
        } else {
            const { count, rows } = await Surat.findAndCountAll({
                offset: (currentPage - 1) * limit,
                limit: limit
            })
            
            const result = {
                status: 'ok',
                page: currentPage,
                limit: limit,
                total_page: Math.ceil(count/limit),
                total_data: count,
                data: rows,
            }
            res.json(result)
        }

    } catch (error) {
        console.log(error, '<-- error get all surat tipe');
    }
}

const getAllSuratByType = async (req, res) => {
    try {
        const { name, id, id_warga, no_surat, id_pegawai, search } = req.query
        
        if (search) {
            const dataSurat = await getSuratQuery('', '', search)
            res.json({ status: 'ok', data: dataSurat })
            console.log('pencarian surat by search');
        } else if (id_pegawai) {
            const dataSurat = await Surat.findOne({
                where: {
                    id_pegawai: id_pegawai
                }
            })
            if (dataSurat === null) {
                res.json({ status: 'failed', message: 'pegawai belum menandatangani surat apapun' })
            } else {
                res.json({ status: 'ok', data: dataSurat })
            }
        } else if (no_surat) {
            const dataSurat = await Surat.findOne({
                where: {
                    no_surat: no_surat
                }
            })
            if (dataSurat === null) {
                res.status(404).json({ message: 'id surat belum terdaftar' })
            } else {
                res.json({ status: 'ok', data: dataSurat })
            }
        } else if (!name) {
            const dataSurat = await getSuratQuery('', '', '')
            res.json({ status: 'ok', data: dataSurat })
        } else if (id_warga) {
            const dataSurat = await Surat.findOne({
                where: {
                    id_warga: id_warga
                }
            })
            res.json({ status: 'ok', nama_surat: name, data: dataSurat })
        } else {
            const dataSurat = await getSuratQuery(name, id, '')
            res.json({ status: 'ok', nama_surat: name, data: dataSurat })
        }
    } catch (error) {
        res.status(400).json({ status: 'failed', message: 'data not found' })
    }
}

const createSuratByType = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw, variabel,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,
            no_surat_pengantar, tgl_surat_pengantar, nama_surat

        } = req.body

        const wargaByNik = await Warga.findOne({
            where: {
                nik: nik
            }
        })

        if (wargaByNik) {
            await Surat.create({
                no_surat: no_surat,
                no_surat_number: no_surat_number,
                nama_surat: nama_surat,
                maksud: maksud,
                isi_surat: isi_surat,
                id_pegawai: id_pegawai,
                id_warga: wargaByNik.dataValues.id,
                no_surat_pengantar: no_surat_pengantar,
                tgl_surat_pengantar: tgl_surat_pengantar
            })
            wargaByNik.nama = nama
            wargaByNik.jenis_kelamin = jenis_kelamin
            wargaByNik.tempat_lahir = tempat_lahir
            wargaByNik.tanggal_lahir = tanggal_lahir
            wargaByNik.pekerjaan = pekerjaan
            wargaByNik.kewarganegaraan = kewarganegaraan
            wargaByNik.status = status
            wargaByNik.agama = agama
            wargaByNik.alamat = alamat
            wargaByNik.rt_rw = rt_rw
            wargaByNik.save()
        } else {
            const newWarga = await Warga.create({
                nama: nama,
                nik: nik,
                jenis_kelamin: jenis_kelamin,
                tempat_lahir: tempat_lahir,
                tanggal_lahir: tanggal_lahir,
                pekerjaan: pekerjaan,
                kewarganegaraan: kewarganegaraan,
                status: status,
                agama: agama,
                alamat: alamat,
                rt_rw: rt_rw,
            })

            await Surat.create({
                no_surat: no_surat,
                no_surat_number: no_surat_number,
                variabel: variabel,
                nama_surat: nama_surat,
                maksud: maksud,
                isi_surat: isi_surat,
                id_pegawai: id_pegawai,
                id_warga: newWarga.id,
                no_surat_pengantar: no_surat_pengantar,
                tgl_surat_pengantar: tgl_surat_pengantar
            })

        }

        res.json({ status: 'ok', message: 'created successfully' })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'nomor surat sudah terdaftar'
        })
    }
}

const updateSuratByType = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,
            no_surat_pengantar, tgl_surat_pengantar, nama_surat, id

        } = req.body

        const surat = await Surat.findByPk(id)
        const warga = await Warga.findByPk(surat.dataValues.id_warga)

        // console.log(warga, '<-- data warga dari db');
        console.log(surat.dataValues.id_warga, '<-- data surat dari db');
        console.log(nama, '<-- request body');

        warga.nama = nama
        warga.nik = nik
        warga.jenis_kelamin = jenis_kelamin
        warga.tempat_lahir = tempat_lahir
        warga.tanggal_lahir = tanggal_lahir
        warga.pekerjaan = pekerjaan
        warga.kewarganegaraan = kewarganegaraan
        warga.status = status
        warga.agama = agama
        warga.alamat = alamat
        warga.rt_rw = rt_rw

        surat.no_surat = no_surat
        surat.no_surat_number = no_surat_number
        surat.maksud = maksud
        surat.no_surat_pengantar = no_surat_pengantar
        // surat.nama_surat = nama_surat
        surat.id_pegawai = id_pegawai

        warga.save()
        surat.save()

        res.json({
            status: 'ok',
            message: 'successfully'
        })

    } catch (error) {
        res.json({
            status: 400, message: 'failed'
        })
        console.log(error, '<-- error update surat');
    }
}

module.exports = { getAllSuratByType, createSuratByType, updateSuratByType, getAllSuratTypes }
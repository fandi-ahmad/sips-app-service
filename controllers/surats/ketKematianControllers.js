const { Surat, sequelize, Warga, Surat_khusus, Surat_kematian, Warga_pelapor } = require('../../models')

const getSuratKematian = async (req, res) => {
    try {
        const { id } = req.query
        let query = /*sql*/`
            SELECT 
                surats.id, surats.no_surat, surats.nama_surat, surats.maksud, surats.variabel,
                surats.createdAt, surats.id_pegawai, surats.id_warga, surats.isi_surat,
                surats.id_surat_khusus, surats.no_surat_pengantar, surats.no_surat_number,

                pegawais.nama AS nama_pegawai, pegawais.jabatan, pegawais.nip,

                w.nama AS nama_warga, w.nik, w.jenis_kelamin, w.tempat_lahir, w.tanggal_lahir,
                w.pekerjaan, w.kewarganegaraan, w.status, w.agama, w.alamat, w.rt_rw,

                surat_khusus.id_kematian, sk.sebab_kematian, sk.tempat_kematian, sk.hari_tanggal, sk.hubungan,
                surats.id_warga_pelapor, wp.nama AS nama_warga_pelapor, wp.nik AS nik_pelapor, wp.alamat AS alamat_pelapor

            FROM surats 
            JOIN pegawais ON (surats.id_pegawai = pegawais.id)
            JOIN wargas AS w ON (surats.id_warga = w.id)
            JOIN surat_khusus ON (surats.id_surat_khusus = surat_khusus.id)
            JOIN surat_kematians AS sk ON (surat_khusus.id_kematian = sk.id)
            JOIN warga_pelapors AS wp ON (surats.id_warga_pelapor = wp.id)
            where surats.nama_surat = "surat keterangan kematian"
        `;

        id ? query += ` AND surats.id = "${id}"` : null

        const dataSurat = await sequelize.query(query)

        const formattedData = dataSurat[0].map((item) => {
            return {
                id: item.id,
                no_surat: item.no_surat,
                no_surat_number: item.no_surat_number,
                no_surat_pengantar: item.no_surat_pengantar,
                variabel: item.variabel,
                nama_surat: item.nama_surat,
                maksud: item.maksud,
                isi_surat: item.isi_surat,
                no_surat_pengantar: item.no_surat_pengantar,
                tgl_surat_pengantar: item.tgl_surat_pengantar,
                createdAt: item.createdAt,
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
                ket_kematian: {
                    id_kematian: item.id_kematian,
                    sebab_kematian: item.sebab_kematian,
                    tempat_kematian: item.tempat_kematian,
                    hari_tanggal: item.hari_tanggal,
                    hubungan: item.hubungan,
                    nama_pelapor: item.nama_warga_pelapor,
                    nik_pelapor: item.nik_pelapor,
                    alamat_pelapor: item.alamat_pelapor
                }
            };
        });


        const result = {
            status: 'ok',
            data: formattedData
        }
        res.json(result)
    } catch (error) {
        console.log(error, '<-- error get surat kematian');
    }
}

const createSuratKematian = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw, variabel,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,
            no_surat_pengantar, tgl_surat_pengantar, nama_surat,

            sebab_kematian, tempat_kematian, hari_tanggal, hubungan,
            nama_p, nik_p, alamat_p

        } = req.body

        const wargaByNik = await Warga.findOne({
            where: {
                nik: nik
            }
        })

        if (wargaByNik) {
            const newMati = await Surat_kematian.create({
                sebab_kematian: sebab_kematian,
                tempat_kematian: tempat_kematian,
                hari_tanggal: hari_tanggal,
                hubungan: hubungan
            })

            const newSuratKhusus = await Surat_khusus.create({
                id_kematian: newMati.id
            })

            const newWargaPelapor = await Warga_pelapor.create({
                nama: nama_p,
                nik: nik_p,
                alamat: alamat_p
            })

            await Surat.create({
                no_surat: no_surat,
                no_surat_number: no_surat_number,
                no_surat_pengantar: no_surat_pengantar,
                nama_surat: nama_surat,
                maksud: maksud,
                isi_surat: isi_surat,
                id_pegawai: id_pegawai,
                id_warga: wargaByNik.dataValues.id,
                id_surat_khusus: newSuratKhusus.id,
                id_warga_pelapor: newWargaPelapor.id
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

            const newMati = await Surat_kematian.create({
                sebab_kematian: sebab_kematian,
                tempat_kematian: tempat_kematian,
                hari_tanggal: hari_tanggal,
                hubungan: hubungan
            })

            const newSuratKhusus = await Surat_khusus.create({
                id_kematian: newMati.id
            })

            const newWargaPelapor = await Warga_pelapor.create({
                nama: nama_p,
                nik: nik_p,
                alamat: alamat_p
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
                tgl_surat_pengantar: tgl_surat_pengantar,
                id_surat_khusus: newSuratKhusus.id,
                id_warga_pelapor: newWargaPelapor.id
            })

        }

        res.json({ status: 'ok', message: 'created successfully' })

    } catch (error) {
        console.log(error, '<-- error create surat kematian');
    }
}

const updateSuratKematian = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw, id_surat,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,
            no_surat_pengantar, tgl_surat_pengantar, nama_surat,

            sebab_kematian, tempat_kematian, hari_tanggal, hubungan,
            nama_p, nik_p, alamat_p

        } = req.body

        const updateSurat = await Surat.findByPk(id_surat)

        const id_warga = updateSurat.dataValues.id_warga
        const updateWarga = await Warga.findByPk(id_warga)

        const id_surat_khusus = updateSurat.dataValues.id_surat_khusus
        const updateSuratKhusus = await Surat_khusus.findByPk(id_surat_khusus)

        const id_ket_kematian = updateSuratKhusus.dataValues.id_kematian
        const updateKetMati = await Surat_kematian.findByPk(id_ket_kematian)

        const id_warga_pelapor = updateSurat.dataValues.id_warga_pelapor
        const updateWargaPelapor = await Warga_pelapor.findByPk(id_warga_pelapor)

        if (id_pegawai) {
            updateSurat.id_pegawai = id_pegawai
        }

        updateSurat.maksud = maksud
        updateSurat.isi_surat = isi_surat
        updateSurat.no_surat_pengantar = no_surat_pengantar
        updateSurat.no_surat = no_surat

        updateWarga.nama = nama
        updateWarga.nik = nik
        updateWarga.jenis_kelamin = jenis_kelamin
        updateWarga.tempat_lahir = tempat_lahir
        updateWarga.tanggal_lahir = tanggal_lahir
        updateWarga.pekerjaan = pekerjaan
        updateWarga.kewarganegaraan = kewarganegaraan
        updateWarga.status = status
        updateWarga.agama = agama
        updateWarga.alamat = alamat
        updateWarga.rt_rw = rt_rw

        updateKetMati.sebab_kematian = sebab_kematian
        updateKetMati.tempat_kematian = tempat_kematian
        updateKetMati.hari_tanggal = hari_tanggal
        updateKetMati.hubungan = hubungan
        
        updateWargaPelapor.nama = nama_p
        updateWargaPelapor.nik = nik_p
        updateWargaPelapor.alamat = alamat_p

        updateSurat.save()
        updateWarga.save()
        updateKetMati.save()
        updateWargaPelapor.save()

        res.json({
            status: 'ok',
            message: 'updated successfully',
            surat: updateSurat,
            warga: updateWarga,
        })

    } catch (error) {
        console.log(error, '<-- error update surat kematian');
        res.json({status: 400, message: 'error'})
    }
}

module.exports = { getSuratKematian, createSuratKematian, updateSuratKematian }
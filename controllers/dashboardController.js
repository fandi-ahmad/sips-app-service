const { Pegawai, Surat, User } = require('../models')

const getDataDashboard = async (req, res) => {
    try {
        const [pegawaiCount, suratCount, userCount] = await Promise.all([
            Pegawai.count(),
            Surat.count(),
            User.count()
        ]);

        const [skBaik, skRumah, skKerja, skMenikah, skUsaha, skDomUsaha, skPenghasilan, skKematian] = await Promise.all([
            Surat.count({
                where: { nama_surat: 'surat keterangan berkelakuan baik' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan belum memiliki rumah' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan belum bekerja' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan belum menikah' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan usaha' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan domisili usaha' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan penghasilan' }
            }),
            Surat.count({
                where: { nama_surat: 'surat keterangan kematian' }
            }),
        ])

        const result = {
            status: 200,
            message: 'ok',
            data: {
                pegawai: pegawaiCount,
                surat: suratCount,
                user: userCount
            },
            surat: {
                sk_baik: skBaik,
                sk_rumah: skRumah,
                sk_kerja: skKerja,
                sk_menikah: skMenikah,
                sk_usaha: skUsaha,
                sk_dom_usaha: skDomUsaha,
                sk_penghasilan: skPenghasilan,
                sk_kematian: skKematian
            }
        };

        res.json(result)
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

module.exports = { getDataDashboard }
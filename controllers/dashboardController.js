const { Pegawai, Surat, User } = require('../models')

const getDataDashboard = async (req, res) => {
    try {
        const [pegawaiCount, suratCount, userCount] = await Promise.all([
            Pegawai.count(),
            Surat.count(),
            User.count()
        ]);

        const result = {
            status: 'ok',
            data: {
                pegawai: pegawaiCount,
                surat: suratCount,
                user: userCount
            }
        };
        res.json(result)
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

module.exports = { getDataDashboard }
const viewLogin = async (req, res) => {
    try {
        const apiUrl = process.env.APP_API_URL;
        res.render('login', {apiUrl: apiUrl})
    } catch (error) {
        console.log(error, '<-- error view login')
    }
}

module.exports = { viewLogin }
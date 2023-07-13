const viewLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error, '<-- error view login')
    }
}

module.exports = { viewLogin }
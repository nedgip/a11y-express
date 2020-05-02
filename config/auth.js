const Authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'You need to log in to see this content.')
    res.redirect('/users/login')
}
const NotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    } return next()

}


module.exports = { Authenticated, NotAuthenticated }
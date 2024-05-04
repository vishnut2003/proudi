const express = require('express');
const userHelpers = require('../helpers/userHelpers');
const router = express.Router();

router.get('/', (req, res) => {
    const userNickname = req.session.user ? req.session.user.username : null
    res.render('backend/dashboard', {
        isDashboard: true,
        page_title: 'Dashboard',
        user_nickname: userNickname
    })
})

router.get('/users', (req, res) => {
    const userNickname = req.session.user ? req.session.user.username : null
    userHelpers.getAllUsers()
        .then((users) => {
            res.render('backend/users', {
                isUsers: true,
                allUsers: users,
                page_title: 'All Users',
                user_nickname: userNickname
            })
        })
        .catch(() => {
            res.send('Database error')
        })
    
})
router.get('/users/delete/:id', (req, res) => {
    userHelpers.deleteOneUser(req.params.id)
        .then(() => {
            res.redirect('/admin/users')
        })
})
router.get('/users/edit/:username', (req, res) => {
    const userNickname = req.session.user ? req.session.user.username : null
    userHelpers.getOneUser(req.params.username)
        .then((user) => {
            res.render('backend/edit_user', {
                user,
                isUsers: true,
                page_title: `Edit User`,
                user_nickname: userNickname
            })
        })
        .catch(() => {
            res.send('User not exist')
        })
})
router.post('/users/edit', (req, res) => {
    res.send(req.body)
})

router.get('/products', (req, res) => {
    res.render('backend/products', {
        isProducts: true
    })
})

module.exports = router;
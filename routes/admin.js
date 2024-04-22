const express = require('express');
const userHelpers = require('../helpers/userHelpers');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('backend/dashboard', {
        isDashboard: true
    })
})

router.get('/users', (req, res) => {
    userHelpers.getAllUsers()
        .then((users) => {
            res.render('backend/users', {
                isUsers: true,
                allUsers: users
            })
        })
        .catch(() => {

        })
    
})
router.get('/users/delete/:id', (req, res) => {
    res.send(req.params.id)
})

router.get('/products', (req, res) => {
    res.render('backend/products', {
        isProducts: true
    })
})

module.exports = router;
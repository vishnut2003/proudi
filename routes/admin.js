const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('backend/dashboard', {
        isDashboard: true
    })
})

router.get('/users', (req, res) => {
    res.render('backend/users', {
        isUsers: true
    })
})

router.get('/products', (req, res) => {
    res.render('backend/products', {
        isProducts: true
    })
})

module.exports = router;
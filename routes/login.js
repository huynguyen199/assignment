var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var users = [{
        id: 1,
        username: '1',
        password: '1'
    },
    {
        id: 2,
        username: '2',
        password: '2'
    }
];
router.get('/login', function (req, res, next) {
    res.render('admin/pages/examples/login', {
        title: 'login'
    });
});

router.post('/login', function (req, res, next) {
    let {
        username,
        password
    } = req.body;
    let user = users.find(us => us.username == username && us.password == password)
    if (user) {
        //Tao Token
        var token = jwt.sign({
            user
        }, process.env.JWT_KEY);
        console.log('token', token);
        //Luu token trong session
        req.session.token = token;
        res.redirect('/admin');
    } else {
        res.redirect('/login')
    }
});


module.exports = router;
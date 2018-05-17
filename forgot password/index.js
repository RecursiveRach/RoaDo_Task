const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/forgotpassword', function (req, res) {
    res.send('<form action="/passwordreset" method="POST">' +
        '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input type="submit" value="Reset Password" />' +
    '</form>');
});

app.post('/passwordreset', function (req, res) {
    if (req.body.email !== undefined) {
        var emailAddress = req.body.email;

       
        var payload = {
            id: 1,       
            email: emailAddress
        };

        
        var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';

        var token = jwt.encode(payload, secret);

        
        res.send('<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>');
    } else {
        res.send('Email address is missing.');
    }
});

app.get('/resetpassword/:id/:token', function(req, res) {
    /
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';
    var payload = jwt.decode(req.params.token, secret);

    
    res.send('<form action="/resetpassword" method="POST">' +
        '<input type="hidden" name="id" value="' + payload.id + '" />' +
        '<input type="hidden" name="token" value="' + req.params.token + '" />' +
        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input type="submit" value="Reset Password" />' +
    '</form>');
});

app.post('/resetpassword', function(req, res) {
    
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';

    var payload = jwt.decode(req.body.token, secret);

    
    res.send('Your password has been successfully changed.');
});

app.listen(3000, function () {
    console.log('Node started on port 3000!')
});

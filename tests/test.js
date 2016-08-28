var Ultron = require('./ultron');
var exec = require('child_process').exec;

var ultron = new Ultron('chrome');

var seedDatabase = new Promise(function(resolve, reject) {
  exec('cd ../ && php artisan db:seed && cd tests', function (error, stdout, stderr) { resolve(); });
});

var loginTest = ultron
  .it("should login")
  .describe(function(open, wait, fill, click, $) {
    open('http://localhost/mercury')
    wait('.top-header .btn-login').toAppear();
    click('.top-header .btn-login');
    wait('#login-form').toAppear();
    fill('#login-form .email-input').with('john_smith@gmail.com');
    fill('#login-form .password-input').with('johnjohn');
    click('#login-form .btn-login');
    wait('#account-dropdown').toAppear();
    $('#account-dropdown').should.haveContent('John');
  })

var logoutTest = ultron
  .it("should logout")
  .describe(function(open, wait, fill, click, $) {
    open('http://localhost/mercury')
    wait('#account-dropdown').toAppear();
    click('#account-dropdown');
    click('.top-header .btn-logout');
    wait('.top-header .btn-login').toAppear();
    $('.top-header').should.haveContent('Login');
  })
  
seedDatabase
  .then(function() {
    return loginTest.run();
  })
  .then(function() {
    return logoutTest.run();
  })
  .then(function() {
    ultron.end();
  })

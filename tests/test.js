var Ultron = require('ultronjs');
var exec = require('child_process').exec;

var ultron = new Ultron('chrome');
var seedDatabase = new Promise(function(resolve, reject) {
  exec('cd ../ && php artisan db:seed && cd tests', function (error, stdout, stderr) { resolve(); });
});

var loginTest = ultron
  .it("should login")
  .describe(function() {
    this.open('http://localhost/mercury')
    this.wait('.top-header .btn-login').toAppear();
    this.click('.top-header .btn-login');
    this.wait('#login-form').toAppear();
    this.fill('#login-form .email-input').with('john_smith@gmail.com');
    this.fill('#login-form .password-input').with('johnjohn');
    this.click('#login-form .btn-login');
    this.wait('#account-dropdown').toAppear();
    this.$('#account-dropdown').should.haveContent('John');
  })

var logoutTest = ultron
  .it("should logout")
  .describe(function(open, wait, fill, click, $) {
    this.open('http://localhost/mercury')
    this.wait('#account-dropdown').toAppear();
    this.click('#account-dropdown');
    this.click('.top-header .btn-logout');
    this.wait('.top-header .btn-login').toAppear();
    this.$('.top-header').should.haveContent('Login');
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

var chalk = require('chalk');
var webdriver = require('selenium-webdriver');

/**
* @class Ultron
* @constructor
*/
var Ultron = function(browser) {
  this.browser = browser;
  this.driver = new webdriver.Builder().forBrowser(this.browser).build();
  this.driver.By = webdriver.By;
  this.driver.until = webdriver.until;
};

Ultron.prototype = {
  
  it: function(description) {
    var test = new Test(description, this.driver);
    
    return test;
  },
  
  end: function() {
    this.driver.quit();
  }
  
};

var Test = function(description, driver) {
  this.description = description || 'anonymous test';
  this.fn = null;
  this.driver = driver;
  this.commands = [];
};

Test.prototype = {
  
  describe: function(fn) {
    this.fn = fn;
    return this;
  },
  
  run: function(options) {
    var test = this;
    return new Promise(function(resolve, reject) {
      test.fn.apply(test, new CommandsManager(test));
      var lastCommand = test.commands[0].exec(test.driver);
      for (var i = 1; i < test.commands.length; i++) {
        lastCommand = lastCommand.then((function(i) {
          return test.commands[i].exec(test.driver);
        })(i));
      }
      lastCommand.then(resolve);
    });
  }
  
};

var CommandsManager = function(test) {
  
  function open(url) {
    test.commands.push(new Command('open-page', {
      url: url
    }));
  }
  
  function wait(selector) {
    return {
      toAppear: function() {
        test.commands.push(new Command('wait-element', {
          selector: selector
        }));
      }
    };
  }
  
  function fill(selector) {
    return {
      with: function(text) {
        test.commands.push(new Command('text-input', {
          selector: selector,
          text: text
        }));
      }
    };
  }
  
  function click(selector) {
    test.commands.push(new Command('button-click', {
      selector: selector
    }));
  }
  
  function $(selector) {
    return {
      should: {
        count: function(expected) {
          test.commands.push(new Command('check-element-count', {
            selector: selector,
            expected: expected
          }));
        },
        haveContent: function(content) {
          test.commands.push(new Command('check-element-content', {
            selector: selector,
            content: content
          }));
        }
      }
    };
  }
  
  return [
    open,
    wait,
    fill,
    click,
    $
  ];
};

var Command = function(type, args) {
  this.type = type;
  this.args = args;
};

Command.prototype = {
  
  exec: function(driver) {
    switch (this.type) {
      case 'open-page':
        return driver.get(this.args.url);
        break;
      case 'wait-element':
        return driver.wait(driver.until.elementLocated(driver.By.css(this.args.selector)));
        break;
      case 'text-input':
        return driver.findElement(driver.By.css(this.args.selector)).sendKeys(this.args.text);
        break;
      case 'button-click':
        return driver.findElement(driver.By.css(this.args.selector)).click();
        break;
      case 'find-element':
        return driver.findElement(driver.By.css(this.args.selector));
        break;
      case 'check-element-count':
        var args = this.args;
        return new Promise(function(resolve, reject) {
          driver.findElements(driver.By.css(args.selector)).then(function(elements) {
            if (typeof args.expected == 'number') {
              // TODO
            } else if (typeof args.expected == 'string') {
              if (args.expected == 'many') {
                if (elements.length > 1) {
                  console.log(chalk.underline("found some " + args.selector) + chalk.green(' [✓]'));
                } else {
                  console.log(chalk.underline("could not found " + args.selector) + chalk.red(' [x]'));
                }
              }
            }
            resolve();
          });
        });
        break;
        case 'check-element-content':
          var args = this.args;
          return new Promise(function(resolve, reject) {
            driver.findElement(driver.By.css(args.selector)).then(function(element) {
              element.getText().then(function(text) {
                if (text.indexOf(args.content) > -1) {
                  console.log(chalk.underline("found the right content on " + args.selector) + chalk.green(' [✓]'));
                } else {
                  console.log(chalk.underline("could not find {" + args.content + "} on " + args.selector) + chalk.red(' [x]'));
                }
                resolve();
              });
            });
          });
          break;
    }
  }
  
};

module.exports = Ultron;

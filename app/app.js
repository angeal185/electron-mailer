const {ipcRenderer} = require('electron'),
appConf = require('./config/appConfig'),
nodemailer = require('nodemailer'),
jQuery = require('jquery'),
$ = jQuery,
_ = require('lodash'),
tpl = require('./data/templates'),
arr = [],
obj = {};
require(appConf.paths.js+'./build.js');
const appUtils = require(appConf.paths.js+'appUtils.js'),
help = require(appConf.paths.data+'help.json');

_.forEach(appConf.requireScripts,function(i){
  require(appConf.paths.js + i + '.js');
})

particlesJS('particle', appConf.particles);

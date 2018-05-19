<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>electron mailer</title>
  <link rel="stylesheet" href="./public/css/font-awesome.min.css">
  <link rel="stylesheet" href="./public/css/materialize.css">
  <link rel="stylesheet" href="./public/css/styles.css">
</head>
<body>
<audio id="audio" preload="auto"></audio>
<script src="./public/js/src-min-noconflict/ace.js"></script>
<script>
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
  </script>
</body>
</html>

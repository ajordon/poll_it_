'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./userManager.js');
// load sass manifest
require('../styles/index.scss');

let clearAll = function() {

};

//-------------------When the webpage is finished loading-------------------
$(document).ready(() => {
  //Initialze Board
  $('.sign-out1').hide();
  $('.change-password1').hide();
});

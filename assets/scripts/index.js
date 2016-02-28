'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./userManager.js');
// load sass manifest
require('../styles/index.scss');

window.myApp = {
    baseUrl: 'http://localhost:8080',
};

let clearAll = function() {

};

//-------------------When the webpage is finished loading-------------------
$(document).ready(() => {
  //Initialze Board
  $('.sign-out1').hide();
  $('.change-password1').hide();
  $('#chart_div').hide();
  $('.intro').show();
  // $('.showpoll').hide();




//------------------------------------------------------------------------------
//---------------------------User Manager---------------------------------------
//----------------SIGN UP----------------
  $('#signup-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#myModal2').modal('hide');
      $('.sign-up1').hide();
      $('.change-password1').hide();
      $('.sign-out1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN IN----------------
  $('#signin-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Welcome " + data.user.email);
      $('#myModal1').modal('hide');
      $('.sign-in1').hide();
      $('.sign-up1').hide();
      $('.sign-out1').show();
      $('.change-password1').show();
      myApp.user = data.user;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------CHANGE PASSWORD----------------
  $('#changepass-form').on('submit', function(e) {
    e.preventDefault();
    if(!myApp.user) {
      console.error("Wrong!!!");
      return;
    }
    var formData = new FormData(e.target);
    console.log(formData);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Password changed");
      $('#myModal3').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN OUT----------------
  $('.sign-out2').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function() {
      $('#myModal4').modal('hide');
      $('.sign-in1').show();
      $('.sign-up1').show();
      $('.sign-out1').hide();
      $('.change-password1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});

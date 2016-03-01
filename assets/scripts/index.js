'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

// use require without a reference to ensure a file is bundled
// load sass manifest
require('../styles/index.scss');

const myApp = {
    baseUrl: 'http://localhost:3000',
};


let updateDataChart = function(data) {

};

let displayPollUrl = function(data) {

};

//---------------------Webpage flow---------------------
let createPollComplete = function() {
  $('.intro').hide();
  $('.poll-link').hide();
  $('.poll-link').hide();
};

let findPollComplete = function() {
  $('#chart_div').show();
};

let deletePollComplete = function() {
  $('#chart_div').hide();
  $('.intro').show();
};

let updatePollComplete = function() {
  $('#chart_div').show();
  $('.intro').hide();
};


let signInComplete = function() {
  $('#myModal1').modal('hide');
  $('.sign-in1').hide();
  $('.sign-up1').hide();
  $('.sign-out1').show();
  $('.change-password1').show();
  $('.intro').hide();
  $('.instructions').show();
  $('.poll-buttons').show();
};

let signUpComplete = function() {
  $('#myModal2').modal('hide');
  $('.sign-up1').hide();
  $('.change-password1').hide();
  $('.sign-out1').hide();
};

let changePassComplete = function() {
  console.log("Password changed");
  $('#myModal3').modal('hide');
};

let signOutComplete = function() {
  $('#myModal4').modal('hide');
  $('.sign-in1').show();
  $('.sign-up1').show();
  $('.sign-out1').hide();
  $('.change-password1').hide();
  $('.intro').show();
};
//------------------------------------------------------------------------------

//---------------------When the webpage is finished loading---------------------
$(document).ready(() => {
  //Initialze
  $('.sign-out1').hide();
  $('.change-password1').hide();
  $('#chart_div').hide();
  $('.intro').show();
  $('.poll-link').hide();

  //----------------------------------------------------------------------------
  //---------------------------Poll Manager-------------------------------------
  $('#create-poll').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/polls',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      createPollComplete();
      displayPollUrl(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#find-poll').on('submit', function(e) {
    $.ajax({
     url: myApp.baseUrl + '/polls/' + myApp.poll.id,
     method: 'GET',
     headers: {
       Authorization: 'Token token=' + myApp.user.token,
     }
   }).done(function(data) {
     myApp.poll = data.poll;
     findPollComplete();
    updateDataChart(data);
   }).fail(function(jqxhr) {
     console.error(jqxhr);
   });
  });

  $('#delete-poll').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/polls/' + myApp.poll.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function() {
      myApp.user = data.user;
      deletePollComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#update-poll').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    $.ajax({
      url: myApp.baseUrl + '/polls/' + myApp.poll.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.poll = data.poll;
      updateDataChart(data);
      updatePollComplete();
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  //---------------------------User Manager-------------------------------------
  //----------------SIGN IN----------------
  $('#signin-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
      console.log("Welcome " + data.user.email);
      signInComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //----------------SIGN UP----------------
  $('#signup-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      signUpComplete();
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
    let formData = new FormData(e.target);
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
      changePassComplete();
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
      signOutComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
  //----------------------------------------------------------------------------
});

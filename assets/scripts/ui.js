"use strict";

const findPollComplete = function() {
  $('#poll-search-bar').val('');
  $('#findPollModal').modal('hide');
  $('.intro').hide();
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').hide();
  $('.piechart').show();
  $('.find-poll-modal').show();
  $('.user-vote').hide();
  $('.vote-on-poll-modal').hide();
};

const deletePollComplete = function() {
  $('.piechart').hide();
  $('.intro').show();
};

const updatePollComplete = function() {
  $('.piechart').show();
  $('.intro').hide();
};

const signUpComplete = function() {
  $('#myModal2').modal('hide');
  $('.sign-up1').hide();
  $('.change-password1').hide();
  $('.sign-out1').hide();
};

const changePassComplete = function() {
  console.log("Password changed");
  $('#myModal3').modal('hide');
};

const signOutComplete = function() {
  $('#myModal4').modal('hide');
  $('.sign-in1').show();
  $('.sign-up1').show();
  $('.sign-out1').hide();
  $('.change-password1').hide();
  $('.intro').show();
  $('.piechart').hide();
  $('.create-poll').hide();
  $('.user-polls').hide();
  $('.user-vote').hide();
  $('.find-poll').show();
  $('.create-poll').show();
};

module.exports = {
  findPollComplete,
  deletePollComplete,
  updatePollComplete,
  signUpComplete,
  changePassComplete,
  signOutComplete
};

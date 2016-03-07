'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

// use require without a reference to ensure a file is bundled
// load sass manifest
require('../styles/index.scss');

const UI = require('./ui.js');

const myApp = {
    baseUrl: 'http://localhost:3000',
};

// data.polls[0].options.map(function(option){ return option.response; }); returns ["Batmand", "Superman"]
let updateDataChart = function(poll) {
  // google.charts.load('current', {packages: ['corechart']});
  $('.poll-id').text('Poll#: ' + poll.id);
  let op0VoteCount = 0;
  let op1VoteCount = 0;

  for (let i = 0;i < poll.votes.length;i++) {
    if (poll.options[0].id === poll.votes[i].option_id) {
      op0VoteCount++;
    }
    else if (poll.options[1].id === poll.votes[i].option_id) {
      op1VoteCount++;
    }
    else {
      op0VoteCount = op0VoteCount;
      op1VoteCount = op1VoteCount;
    }
  }

  let arr0 = [poll.options[0].response, op0VoteCount];
  let arr1 = [poll.options[1].response, op1VoteCount];

  google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      let data = new google.visualization.DataTable();
      data.addColumn('string', poll.options[0].response);
      data.addColumn('number', poll.options[1].response);
      data.addRows([
                    arr0,
                    arr1
                  ]);
      let options = {
        'title': poll.question,
        'width':700,
        'height':600,
        'backgroundColor':'#1D9ABD'
      };
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
};

let displayPollUrl = function(data) {
  $('.poll-link').innerHTML = myApp.baseUrl + "/polls/" + data.poll.id;
};

let showUserPolls = function(user) {
  $.ajax({
    url: myApp.baseUrl + '/polls?search_user=' + user.id ,
    method: 'GET',
    dataType: 'json'
 }).done(function(data) {
    myApp.poll = data.polls;
    pollsTemplate(myApp.poll);
    console.log(data);
 }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let pollsTemplate = function(data) {
   let polls = myApp.poll;
   let pollListingTemplate = require('./poll-listing.handlebars');
   $('.user-polls').append(pollListingTemplate({polls}));
};

//---------------------Webpage flow---------------------
let createPollComplete = function(data) {
  $('.intro').hide();
  $('.poll-link').hide();
  $('.poll-link').hide();
  $('#createPollModal').modal('hide');
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').hide();
  $('.user-vote').show();
  $('.user-vote').text(data.poll.question);
  $('#user-vote-option0').append(data.poll.options[0].response); // FIX ME - IDs must match HTML
  $('#user-vote-option1').append(data.poll.options[1].response); // FIX ME
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
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').css("margin-left", "25em");
  $('.user-polls').show();
  $('.user-vote').hide();
  // $('#option0').hide();   //THIS LINE DOES NOTHING
  // SO FAR SO GOOD
  // $('#option1').hide();
  // BROKEN!!
};



//---------------------When the webpage is finished loading---------------------
$(document).ready(() => {
  //Initialze
  $('.sign-out1').hide();
  $('.change-password1').hide();
  $('.piechart').hide();
  $('.intro').show();
  $('.poll-link').hide();
  $('.user-polls').hide();
  $('.user-vote').hide();
  $('.find-poll-modal').hide();
  google.charts.load('current', {packages: ['corechart']});

  //----------------------------------------------------------------------------
  //---------------------------Poll Manager-------------------------------------
  //----------------Create Poll----------------
  $('#create-poll-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/polls',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.poll = data.poll;
      console.log(data);
      createPollComplete(myApp.poll);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //----------------Find Poll----------------
  $('#find-poll-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
     url: myApp.baseUrl + '/polls?search_key=' + $('#poll-search-bar').val(),
     method: 'GET',
     dataType: 'json'
   }).done(function(data) {
     myApp.poll = data.poll;
     console.log(data);
     UI.findPollComplete();
     updateDataChart(data.polls[0]);
   }).fail(function(jqxhr) {
     console.error(jqxhr);
   });
  });

  //----------------Delete Poll----------------
  $('.user-polls').on('click', 'hb-delete', function(e) {
    e.preventDefault();
    let id = $(e.target).attr("data-id");
    $.ajax({
      url: myApp.baseUrl + '/polls/' + id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
      showUserPolls(myApp.user);
      UI.deletePollComplete;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //----------------Update Poll----------------
  $('#update-poll').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    $.ajax({
      url: myApp.baseUrl + '/polls/' + myApp.poll.id,
      method: 'PATCH',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.poll.votes = data.poll.votes;
      updateDataChart(data.polls[0]);
      UI.updatePollComplete();
      // $('.poll-link').inneHTML = myApp.baseUrl + "/polls/" + myApp.poll.id;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
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
      signInComplete();
      showUserPolls(myApp.user);
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
      UI.signUpComplete();
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
      myApp.user = data.user;
      UI.changePassComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //----------------SIGN OUT----------------
  $('.signout-form').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
      UI.signOutComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //----------------View Poll----------------
  $('.user-polls').on('click', 'hb-view', function(e) {
    e.preventDefault();
    let id = $(e.target).attr("data-id");
  });

});

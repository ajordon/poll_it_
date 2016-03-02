'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

// use require without a reference to ensure a file is bundled
// load sass manifest
require('../styles/index.scss');

const myApp = {
    baseUrl: 'http://localhost:3000',
};

// data.polls[0].options.map(function(option){ return option.response; }); returns ["Batmand", "Superman"]
let updateDataChart = function(poll) {
  // $('.poll-id').append(poll.id);
  let count0, count1 = 0;
  for (let i = 0;i < poll.votes.options[0].length;i++) {
    count0 += 1;
  }
  for (let i = 0;i < poll.votes.options[1].length;i++) {
    count1 += 1;
  }

  google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      let data = new google.visualization.DataTable();
      data.addColumn('string', poll.options[0].response);
      data.addColumn('number', poll.options[1].response);
      data.addRows([poll.options[0].response, count0],
                    [poll.options[1].response, count1]);
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

//---------------------Webpage flow---------------------
let createPollComplete = function(formData) {
  $('.intro').hide();
  $('.poll-link').hide();
  $('.poll-link').hide();
  $('#createPollModal').modal('hide');
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').hide();
  $('.user-vote').show();
};

let findPollComplete = function() {
  $('#poll-search-bar').val('');
  $('#findPollModal').modal('hide');
  $('.intro').hide();
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').hide();
  $('#chart_div').show();
  $('.find-poll-modal').show();
  $('.user-vote').show();
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
  $('.bgimage').hide();
  $('.find-poll').hide();
  $('.create-poll').css("margin-left", "25em");
  $('.user-polls').show();
  $('.user-vote').show();
  let pollListingTemplate = require('./poll-listing.handlebars');
  // let formData = new FormData();
   $.ajax({
    url: myApp.baseUrl + '/polls?search_key=' + myApp.user.id,
    method: 'GET',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
  }).done(function(data) {
   myApp.user = data.user;
  }).fail(function(jqxhr) {
   console.error(jqxhr);
  });

  let polls = myApp.user.polls;
  $('.user-polls').append(pollListingTemplate({polls}));

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
  $('.user-polls').hide();
  $('.user-vote').hide();

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
      createPollComplete(formData);
      $('.poll-link').inneHTML = myApp.baseUrl + "/polls/" + myApp.poll.id;
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
     findPollComplete();
     updateDataChart(data.polls[0]);
   }).fail(function(jqxhr) {
     console.error(jqxhr);
   });
  });

  //----------------Delete Poll----------------
  $('.delete-poll').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/polls/' + myApp.poll.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function() {
      myApp.poll = data.poll;
      deletePollComplete();
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
      updatePollComplete();
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
      myApp.user = data.user;
      changePassComplete();
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
      }
    }).done(function() {
      signOutComplete();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
  //----------------------------------------------------------------------------
});

$(document).ready(function() {
  $('.navcontrol').on('click', function() {
    if ($('.navigation').is(':visible')) {
      $('.navigation').slideToggle();
      $('.navcontrol').text('☰ Navigate').css('color', 'inherit');
    } else {
      $('.navigation').slideToggle();
      $('.navcontrol').text('× Close').css('color', 'rgb(237,28,36)');
    }
  });

  function checkIfMobile(x) {
    if (x.matches) { // if mobile
      $('.navigation').hide();
    }
  }

  // Financing Steps
  $('.popup').hide();//hide the popup window on page load
  $('.finance-button').on('click', function() { // after clickin donate or loan buttons, pull up information form to collect data
    $buttonId = $(this).attr('id');
    if ($buttonId == 'donatebutton') {
      $('div.donation').addClass('selected')
    } else if ($buttonId == 'loanbutton') {
      $('div.loan').addClass('selected');
    }
    $('.truck').animate({marginRight: "200vw"}, 800);
    $('.finance').animate({marginRight: "200vw"}, 800);
    $('.popup').fadeIn(1000).animate({marginLeft: "0"}, 800);
    $('.information').animate({marginLeft: "0"}, 800);
  });

  $('button.btn').on('click', function() { //form button submit
    var $selected = $('.selected');
    $('.information').animate({marginLeft: "-200vw"}, 800);
    $($selected).animate({marginLeft: "0"}, 800);
  });

  // Loan Functions
  $('.slider').slider({
    max: 38000,
    min: 500,
    step: 100,
    value: 500,
  });

  function getLoanAmount() {
    var loanAmount = $('.loanamount');
    var $selection = $( ".slider" ).slider( "value" );
    $(loanAmount).text($selection);
  }

  getLoanAmount();

  $('.slider').on('slide', function() {
    getLoanAmount();
  });

  $(".slider").on( "slidestop", function() {
    var $amount = $('.loanamount').text();
    $( ".slider" ).slider( "option", "value", $amount );
    $('a.paypalbutton').attr('href', 'https://www.paypal.com/donate?hosted_button_id=LR2YL2LXSYSTQ&amount=' + $amount);
  });

  $('button.submitloan').on('click', function() {
    $('.loan-setter').slideUp();
    $('#smart-button-container').css('display', 'block');
  });

  // function initPayPalButton() {
  //   paypal.Buttons({
  //     style: {
  //       shape: 'pill',
  //       color: 'white',
  //       layout: 'vertical',
  //       label: 'paypal',
  //
  //     },
  //
  //     createOrder: function(data, actions) {
  //       var $amount = $('.loanamount').text();
  //       $('.dollaramount').text($amount);
  //       return actions.order.create({
  //         purchase_units: [{"amount":{"currency_code":"USD","value": $amount}}]
  //       });
  //     },
  //
  //     onApprove: function(data, actions) {
  //       return actions.order.capture().then(function(details) {
  //         alert('Transaction completed by ' + details.payer.name.given_name + '!');
  //       });
  //     },
  //
  //     onError: function(err) {
  //       console.log(err);
  //     }
  //   }).render('#paypal-button-container');
  // }
  // initPayPalButton();
});

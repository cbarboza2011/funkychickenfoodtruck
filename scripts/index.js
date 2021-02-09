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
  $('.popup').hide();
  $('.finance-button').on('click', function() {
    $('.truck').animate({marginRight: "200vw"}, 800);
    $('.finance').animate({marginRight: "200vw"}, 800);
    $('.popup').fadeIn(1000).animate({marginLeft: "0"}, 800);
    $('.information').animate({marginLeft: "0"}, 800);
  });
  $('.form-group button').on('click', function() {
    $('.information').animate({marginRight: "100vw"}, 800);

    $('.information').animate({marginLeft: "0"}, 800);
  });

  // Loan Functions
  $('.slider').slider({
    max: 38100,
    min: 400,
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
  });

  function initPayPalButton() {
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'white',
        layout: 'vertical',
        label: 'paypal',

      },

      createOrder: function(data, actions) {
        var $amount = $('.loanamount').text();
        $('.dollaramount').text($amount);
        return actions.order.create({
          purchase_units: [{"amount":{"currency_code":"USD","value": $amount}}]
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      },

      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }
  initPayPalButton();
});

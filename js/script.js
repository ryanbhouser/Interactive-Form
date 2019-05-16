const $nameInput = $('#name');
const $emailInput = $('#mail');
const $titleSelect = $('#title');
const $otherTitleInput = $('#other-title');
const $designSelect = $('#design');
const $colorSelect = $('#color');
const $paymentSelect = $('#payment');

const emailRegex = /[^@]+@[^@.]+\.[a-z]+/i;
const ccNumRegex = /^\d{13,16}$/;
const zipRegex = /\d{5}/;
const cvvRegex = /\d{3}/;

// First text field in focus on page load
$nameInput.focus();

// Hides otherTitleInput & shows it if it is selected
$otherTitleInput.hide();
$titleSelect.change(function () {
  if ($(this).val() === 'other') {
    $otherTitleInput.show();
  } else {
    $otherTitleInput.hide();
  }
});

if ($('#design > option:selected').val() === 'select') {
  $('#color').hide();
  $('label[for="color"]').hide();
}

// Determine which color options to display
$('#design').change(function() {
  let flag = true;

  if ($(this).val() === 'js puns') {
    // Displays JS Pun colors
    $('#color').show();
    $('label[for="color"]').show();
    $('#color > option').each(function() {
      let optionText = $(this).text();
      if (optionText.toLowerCase().indexOf('js puns') === -1) {
        $(this).hide();
      } else {
        $(this).show();
        if (flag) {
          $(this).prop('selected', true);
          flag = false;
        }
      }
    });
  } else if ($(this).val() === 'heart js') {
    // Displays I Heart JS colors
    $('#color > option').each(function() {
      $('#color').show();
      $('label[for="color"]').show();
      let optionText = $(this).text();
      if (optionText.toLowerCase().indexOf('js shirt') === -1) {
        $(this).hide();
      } else {
        $(this).show();
        if (flag) {
          $(this).prop('selected', true);
          flag = false;
        }
      }
    });
  } else {
    // Hides color dropdown
    $('#color').hide();
    $('label[for="color"]').hide();
  }
});


// Display correct payment information/inputs
$('#paypal').hide(); 
$('#bitcoin').hide();
$paymentSelect.change(function () {
  if ($(this).val() === 'select_method') {
    $('#credit-card').hide();
    $('#paypal').hide(); 
    $('#bitcoin').hide(); 
  } else if ($(this).val() === 'credit_card') {
    $('#credit-card').show();
    $('#paypal').hide(); 
    $('#bitcoin').hide(); 
  } else if ($(this).val() === 'paypal') {
    $('#credit-card').hide();
    $('#paypal').show(); 
    $('#bitcoin').hide(); 
  } else if ($(this).val() === 'bitcoin') {
    $('#credit-card').hide();
    $('#paypal').hide(); 
    $('#bitcoin').show(); 
  }  
});

// Prevent form submits...
$("form").submit(function(e){
  // Name validation
  if ($nameInput.val() == '') {
    alert('name?');
    $nameInput.css('borderColor', 'red');
    e.preventDefault(e);
  }
  // email validation
  if (emailRegex.test($emailInput.val()) == false) {
    alert('wrong email');
    $emailInput.css('borderColor', 'red');
    e.preventDefault(e);
  }
  // checkbox validation
  if($('input:checkbox:checked').length < 1) {
    $('input:checkbox').css('borderColor', 'red');
    alert('Please select at least one checkbox');
    e.preventDefault(e);
  }
  // credit card validation
  if($('option[val="credit_card"]').prop('selected') == true) {
    if(ccNumRegex.test($('#cc-num').val()) == false) {
      $('#cc-num').css('borderColor', 'red');
      alert('ccnum');
      e.preventDefault(e);
    }
    if(zipRegex.test($('#zip').val()) == false) {
      $('#zip').css('borderColor', 'red');
      alert('zip');
      e.preventDefault(e);
    }
    if (cvvRegex.test($('#cvv').val()) == false) {
      $('#cvv').css('borderColor', 'red');
      alert('cvv');
      e.preventDefault(e);
    }
  }
});
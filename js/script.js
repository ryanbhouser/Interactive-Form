const nameInput = $('#name');
const titleSelect = $('#title');
const otherTitleInput = $('#other-title');
const paymentDropDown = $('#payment');
const activitiesSection = $('.activities');
const totalCostDiv = $('.total-cost');
let totalCost = 0;
const emailRegex = /[^@]+@[^@.]+\.[a-z]+/i;
const ccNumRegex = /^\d{13,16}$/;
const zipRegex = /\d{5}/;
const cvvRegex = /\d{3}/;

////////////////////////////////////////////
// Focus on name input
////////////////////////////////////////////
nameInput.focus();

////////////////////////////////////////////
// Toggle "other" input field
////////////////////////////////////////////
otherTitleInput.hide();
titleSelect.change(function () {
  if ($(this).val() === 'other') {
    otherTitleInput.show();
  } else {
    otherTitleInput.hide();
  }
});

////////////////////////////////////////////
// T-shirt design selection
////////////////////////////////////////////
// Hide color until a theme is chosen
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

////////////////////////////////////////////
// Activity section
////////////////////////////////////////////
activitiesSection.change(function(e) {
  // Listen for checks
  const input = e.target;
  const labelText = $(input).parent().text();
  // Find and store dollar amount
  const dollar = labelText.indexOf('$') + 1;
  const dollarAmt = labelText.slice(dollar);
  const dollarAmtInt = parseInt(dollarAmt);
  // Update & display the cost
  if (e.target.checked) {
    totalCost += dollarAmtInt;
  } else {
    totalCost -= dollarAmtInt;
  }
  totalCostDiv.text('Total: $' + totalCost);
});


////////////////////////////////////////////
// Payment section
////////////////////////////////////////////
$('#paypal').hide(); 
$('#bitcoin').hide();
paymentDropDown.change(function () {
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

////////////////////////////////////////////
// Validation messages
////////////////////////////////////////////
// Name validation
function validName() {
  if (nameInput.val().length > 0 ) {
    nameInput.css('borderColor', 'green');
    return true;
  }
  nameInput.css('borderColor', 'red');
  return false;
}

// Email validation
function validEmail() {
  const emailInput = $('#mail');
  if (emailRegex.test(emailInput.val()) == true) {
    emailInput.css('borderColor', 'green');
    return true;
  }
  emailInput.css('borderColor', 'red');
  return false;
}

// Other job field validation
function validOtherJob() {
  const otherDropDown = $('option[value="other"]');
  if (otherDropDown.prop('selected') === true) {
    if (otherTitleInput.val() === '') {
      otherTitleInput.css('borderColor', 'red');
      return false;
    }
    otherTitleInput.css('borderColor', 'green');
    return true;
  }
}

// T-shirt design selection validation
function validShirtChoice() {
  const designDropDown = $('#design');
  const designSelect = $('option[value="select"]');
  if (designSelect.prop('selected') === true) {
    designDropDown.css('borderColor', 'red');
    return false
  }
  designDropDown.css('borderColor', 'green');
  return true;
}

// Checkbox validation
function validActivities() {
  const activityCheckboxes = $('input:checkbox');
  if ($('input:checkbox:checked').length > 0) {
    return true;
  }
  activityCheckboxes.css('boxShadow', '0 0 1px red');
  return false;
}

// Payment choice selection validation
function validPayment() {
  
  const paymentSelect = $('option[value="select_method"]');
  if (paymentSelect.prop('selected') === true) {
    paymentDropDown.css('borderColor', 'red');
    return false;
  }
  paymentDropDown.css('borderColor', 'green');
  return true;
}

// CC Number validation
function validCC() {
  const cc = $('#cc-num');
  if (ccNumRegex.test(cc.val()) == true) {
    cc.css('borderColor', 'green');
    return true;
  }
  cc.css('borderColor', 'red');
  return false;
}

// Zip validation
function validZip() {
  const zip = $('#zip');
  if (zipRegex.test(zip.val()) == true) {
    zip.css('borderColor', 'green');
    return true;
  }
  zip.css('borderColor', 'red');
  return false;
}

// CVV validation
function validCVV() {
  const cvv = $('#cvv');
  if (cvvRegex.test(cvv.val()) == true) {
    cvv.css('borderColor', 'green');
    return true;
  }
  cvv.css('borderColor', 'red');
  return false;
}

////////////////////////////////////////////
// Form validation
////////////////////////////////////////////
function validateForm() {
  const validator = [];
  validator.push(validName());
  validator.push(validEmail());
  if ($('option[value="other"]').prop('selected') === true) {
    validator.push(validOtherJob());
  }
  validator.push(validShirtChoice());
  validator.push(validActivities());
  if ($('option[value="select_method"]').prop('selected') === true) {
    validator.push(validPayment());
  }
  if($('option[value="credit_card"]').prop('selected') === true) {
    validator.push(validCC());
    validator.push(validZip());
    validator.push(validCVV());
  }
  for (let i = 0; i < validator.length; i++) {
    if (validator[i] === false) {
      return false;
    }
  }  
}

////////////////////////////////////////////
// Keep form from submiting if invalid
////////////////////////////////////////////
$('form').submit(function(e) {
  if (validateForm() === false) {
    e.preventDefault();
    return false;
  }
});
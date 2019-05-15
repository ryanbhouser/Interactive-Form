const $nameInput = $('#name');
const $emailInput = $('#mail');
const $titleSelect = $('#title');
const $otherTitleInput = $('#other-title');
const $designSelect = $('#design');
const $colorSelect = $('#color');
const $paymentSelect = $('#payment');

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

// Hides the color dropdown until a theme is chosen
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
  if ($nameInput.val() == '' || 
      $emailInput.val() =='') {
    e.preventDefault(e);
  }
});
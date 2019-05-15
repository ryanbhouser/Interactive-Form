const nameInput = $('#name');
const title = $('#title');
const otherTitleInput = $('#other-title');

// First text field in focus on page load
nameInput.focus();

// Hides otherTitleInput & shows it if it is selected
otherTitleInput.hide();
title.change(function() {
  if ($(this).val() === "other") {
    otherTitleInput.show();
  } else {
    otherTitleInput.hide();
  }
});
$(document).ready(function() {
  //code for to hide and show elements using jquery.
  $("#customerComment").hide();
  $("#more_details1").on("click", function() {
    $("#customerComment").toggle();
  });
  //code for animated effects
  $("#images").fadeOut(500);
  $("#images").fadeIn(2000);
});

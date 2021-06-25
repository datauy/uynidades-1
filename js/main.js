var unit = "usd";
var uynidades;
$( document ).ready(function() {
  var $origin = $('#origin');
  var $originUnit = $('#origin-unit');
  var $converted = $('#converted');
  var $convertedUnit = $('#converted-unit');
  //get UYNINDADES from JSON
  $.getJSON("uynidades.json", function(json) {
    var $select = $('#select-unit');
    $.each(json, function(key, value) {
      $select.append(`<option value="${key}">${value.name}</option>`);
    });
    uynidades = json;
    //Add random option
    random_unit();
  });

  // DATA change
  $('.target').change( function(){
    //Activate card__loader
    $('.uy-card__loader').show().delay(2000).fadeOut();
    let $unitFrom = $('#select-currency option:selected');
    let unitTo = $('#select-unit option:selected').val();
    $origin.text($('#input-money').val());
    $converted.text( prettyNumber((uynidades[unitTo].factor*$('#input-money').val()/$unitFrom.val()).toFixed(2)) );
    $convertedUnit.text( uynidades[unitTo].name );
    $originUnit.text( $unitFrom.text() );
    console.log("CHANGED", unitTo);
  });

});
// GENERAL FUNCTIONS
$(document).on('keypress',function(e) {
  if(e.which == 13) {
    alert('You pressed enter!');
  }
});
function random_unit(reload = false) {
  let rand = Math.floor(Math.random() * ($(Object.keys(uynidades)).length));
  let key = Object.keys(uynidades)[rand]
  console.log(key);
  $('#select-unit option[value="'+key+'"]').prop('selected', true)
  if ( reload ) {
    $('.target').change();
  }
}
//
function prettyNumber(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 +','+ x[1];
}

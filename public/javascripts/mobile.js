(function() {

  function recordWeigth(event){
    event.preventDefault();
    $.mobile.loading('show', { text: "Saving", theme: 'b' });
    var data = {
      weight: $('#weight-number').val(),
      meal: $('#meal-flip').val()
    }
    $.ajax({
      url: '/history',
      type: 'POST',
      data: data,
      success: function(data, textStatus, xhr) {
        if(data && data.direction) {
          $('#result').find('[data-role="content"] h1').hide();
          $('#result').find('#' + data.direction + '-result').show();
        } else {
          $('#result').find('#same-result').show();
        }
        $.mobile.changePage($('#result'));
      },
      error: function(xhr, status, err){
        $.mobile.loading('hide');
        alert('Something went wrong :(');
      }
    });
    return false;
  };

  $(document).ready(function(){
    // events
    $('#record-weight').delegate('#save_btn', 'click', recordWeigth);
  });


})();
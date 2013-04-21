(function() {

  var histListItemTemplate =
"<li>\
  <h2><%= weight %>Kg</h2>\
  <p><%= when %></p>\
  <p class='ui-li-aside'><%= direction %></p>\
</li>";

  var errorHandeler = function(xhr, status, err){
    $.mobile.loading('hide');
    if (xhr.status === 401) {
      window.location = "/"; // get them to login again
    } else {
      alert('Something went wrong :( ' + status + "." + err);
    }
  };

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
      error: errorHandeler
    });

    return false;
  };

  function getHistory(event){
    event.preventDefault();
    $.mobile.loading('show', { text: "Getting History", theme: 'b' });

    $.ajax({
      url: '/history',
      type: 'GET',
      success: function(data, textStatus, xhr){
        $.mobile.loading('hide');
        var html = "";
        _.each(data, function(d) {
          d.when = new Date(d.when).format("ddd dd mmm yyyy HH:MM");
          html += _.template(histListItemTemplate, d);
        });
        if(data.length === 0) {
          html = "<i>Nothing was found</i>";
        }
        $('#historyList').html(html).listview('refresh');
      },
      error: errorHandeler
    });

    return false;
  };

  function clearHistory(event) {
    event.preventDefault();
    $.mobile.loading('show', { text: "Clearing History", theme: 'b' });

    $.ajax({
      url: '/history',
      type: 'DELETE',
      success: function(data, textStatus, xhr){
        $.mobile.loading('hide');
        $.mobile.changePage($('#home'));
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
    $('#history').on("pageshow", getHistory);
    $('#clear-history').delegate('#clearHistory_btn', 'click', clearHistory);
  });


})();
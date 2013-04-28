$(function(){
  var red, green, blue;

  function resetColour(){
    red = 150; //255;
    green = 16;
    blue = 16;
  };

  function toggle() {
    $('.colour1').toggleClass('clear');
  };

  function rgbColour(){
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  }

  resetColour();
  less.modifyVars({
      '@red': rgbColour()
    });

  $('#colourRGB').html(rgbColour());

  // Change the colour every 2 sec
  window.interval = setInterval(toggle,2000);

  $('#flip').click(function(e){
    e.preventDefault();
    toggle();
    return false;
  });
  $('#stop').click(function(e){
    e.preventDefault();
    if(window.interval){
      window.clearInterval(window.interval);
      window.interval = undefined;
    }
    return false;
  });
  $('#start').click(function(e){
    e.preventDefault();
    if(window.interval){
      window.clearInterval(window.interval);
    }
    toggle();
    window.interval = setInterval(toggle,3000);
    return false;
  });
  $('#darker').click(function(e){
    e.preventDefault();
    red = red - 20;
    if(red < 110) { resetColour(); }
    less.modifyVars({
      '@red': rgbColour()
    });
    return false;
  });
});
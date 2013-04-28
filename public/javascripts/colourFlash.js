$(function(){
  var red, green, blue;

  function displayColour(){
    var c = rgbColour();
    less.modifyVars({
        '@baseColour': c
      });
    $('.colourRGB').text(c);
  }

  function resetColour(){
    red = 255; //255;
    green = 16;
    blue = 16;
    displayColour();
  };

  function darker() {
    red = red - 15;
    if (red < 110) { resetColour(); }
    displayColour();
  };

  function toggle() {
    $('.colour1').toggleClass('clear');
    $('.colour2').toggleClass('clear');
  };

  function rgbColour(){
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  }

  resetColour();

  // Change the colour every 2 sec
  window.toggleInterval = setInterval(toggle,1000);
  window.darkenInterval = setInterval(darker,3000);

  $('#flip').click(function(e){
    e.preventDefault();
    toggle();
    return false;
  });
  $('#stop').click(function(e){
    e.preventDefault();
    if(window.toggleInterval){
      window.clearInterval(window.toggleInterval);
      window.clearInterval(window.darkenInterval);
      window.toggleInterval = undefined;
      window.darkenInterval = undefined;
    }
    return false;
  });
  $('#start').click(function(e){
    e.preventDefault();
    if(window.toggleInterval){
      window.clearInterval(window.toggleInterval);
      window.clearInterval(window.darkenInterval);
    }
    toggle();
    window.toggleInterval = setInterval(toggle,3000);
    window.darkenInterval = setInterval(darker,3000);
    return false;
  });
  $('#darker').click(function(e){
    e.preventDefault();
    darker();
    return false;
  });
});
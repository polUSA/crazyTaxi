$(window).on("load", function() {

  var $container = $('#container');
  var $taxi = $("#taxi");
  
  //initial setup
  var taxiWidth = parseInt($taxi.width());
  var taxiHeight = parseInt($taxi.height());
  var containerWidth = parseInt($container.width());
  var containerHeight = parseInt($container.height());
  //

  var myTaxi = {
    name: 'Crazy Taxi',
    moveUp: function (pos) {
      $taxi.css('top', pos.top - 20 + "px");
    },
    moveDown: function (pos) {
      $taxi.css('top', pos.top + 20 + "px");
    },
    moveLeft: function (pos) {
      $taxi.css('left', pos.left - 20 + "px");
    },
    moveRight: function (pos) {
      $taxi.css('left', pos.left + 20 + "px");
    }
  }

  $(document).keydown(function(e) {
    // alert(e.keyCode);
    var position = $taxi.position()
    if (e.keyCode === 38 && position.top > 0) {
      myTaxi.moveUp(position);
    } else if (e.keyCode === 40 && position.top < (containerHeight - taxiHeight)) {
      myTaxi.moveDown(position);
    } else if (e.keyCode === 37 && position.left > 0) {
      myTaxi.moveLeft(position);
    } else if (e.keyCode === 39 && position.left < (containerWidth - taxiWidth)) {
      myTaxi.moveRight(position);
    }

  });
   
  function createObstacles() {
    
    var obstacles = [];
    for (let i = 0; i < 3; i++) {    
      var $enemyCar = $('<div/>').addClass('obstacles');
      $enemyCar.css('left', getEnemyRandomX());
      $enemyCar.css('top', getEnemyRandomY(-70,-300));
      obstacles.push($enemyCar);
    }
    $('#container').append(obstacles); 
    var positionElement0 = $(obstacles[0]).position();
    var positionElement1 = $(obstacles[1]).position();
    var positionElement2 = $(obstacles[2]).position();

    positionElement0.right = positionElement0.left + $(obstacles[0]).width();
    positionElement1.right = positionElement1.left + $(obstacles[1]).width();
    positionElement2.right = positionElement2.left + $(obstacles[2]).width();

    positionElement0.bottom = positionElement0.top + $(obstacles[0]).height();
    positionElement1.bottom = positionElement1.top + $(obstacles[1]).height();
    positionElement2.bottom = positionElement2.top + $(obstacles[2]).height();
    
    if (  collisionDetection(positionElement0,positionElement1) || 
          collisionDetection(positionElement0,positionElement2) || 
          collisionDetection(positionElement1,positionElement2)){
          
          $('.obstacles').remove();
          createObstacles();   
    }
  }

  function collisionDetection (x,y){
    return !(x.right < y.left || 
        x.left > y.right || 
        x.bottom < y.top || 
        x.top > y.bottom)
  }
    
  var $obstacles = $('.obstacles');
  
  function getEnemyRandomX(){
    var random = Math.floor(Math.random()* ($container.width() - $taxi.width()));
    return random
  }
  
  function getEnemyRandomY(min, max ){
    var random = Math.floor(Math.random() * (max - min)) + min;
    return random
  }

createObstacles();
});
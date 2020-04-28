var logString = "";
var canvas;
var ctx;
var windowHeight, windowWidth;
var alpha, beta, gamma, absolute;
var accX, accY, accZ;

function drawLog() {
    ctx.fillStyle = "#003300";
    ctx.font = '30px serif';
    ctx.fillText(logString, 10, 50, windowWidth/2);
}

function lock (orientation) {
    // Go into full screen first
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  
    // Then lock orientation
    screen.orientation.lock(orientation);
  }
function fullscreen () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}
function unlock () {
    // Unlock Orientierung
    screen.orientation.unlock();
    // Vollbild beenden
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


function handleOrientation(event) {
    absolute = event.absolute;
    alpha    = event.alpha;
    beta     = event.beta;
    gamma    = event.gamma;
    // Do stuff with the new orientation data
}
function handleMotion(event) {
    accX = event.acceleration.x;
    accY = event.acceleration.y;
    accZ = event.acceleration.z;

    var acceleration_g_x = event.accelerationIncludingGravity.x;
    var acceleration_g_y = event.accelerationIncludingGravity.y;
    var acceleration_g_z = event.accelerationIncludingGravity.z;
}

function init() {
    document.documentElement.style.setProperty('--my-variable-name', 'pink');
    window.addEventListener("backbutton", function() {
      
    })
    document.querySelector('#play-button').addEventListener('click', e => e.target.style.display = 'none');
    document.querySelector('#play-button').addEventListener('click', function() { document.documentElement.style.setProperty('--game-display', 'initial');});
    document.querySelector('#start-button').addEventListener('click', e => e.target.style.display = 'none');
    document.querySelector('#start-button').addEventListener('click', function() { document.documentElement.style.setProperty('--play-display', 'initial');});
    
    document.onkeydown = function(evt) {
      if(evt.key == "Escape"){
          document.documentElement.style.setProperty('--game-display', 'none');
      }
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
      alert('device orientation not supported');
      // add fallback code here, as necessary
    }
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, false);
    } else {
      alert('device motion not supported');
    }
    
    //screen.orientation.lock("any");
    barImg=document.getElementById("bar");
    circle = new Circle(10,10,circleradius, "#00ff00");
    futurecircle = new Circle(10,10,circleradius, "#ff0000");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d"); 
    timer=setInterval(draw, 20);
  }

  function opengame() {
    lock('landscape-primary');
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowHeight > windowWidth) {
      windowHeight = windowWidth;
      windowWidth = window.innerHeight;
    }
    //loadMapOne();
  }
  
  function closegame() {
    unlock();
  }
  

  function draw() {
    alert("drawing");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue('--my-variable-name');
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#003300";
    ctx.font = '30px serif';

    log = alpha + ", " + beta + ", " + gamma + ", " + absolute +"\n" +
          accX + ", " + accY + ", " + accZ;
    drawLog();

    /*precalcdeadlycirclelist.forEach(function(entry) {
      ctx.fillStyle = entry.color;
      ctx.beginPath();
      ctx.arc(entry.x, entry.y, entry.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });
    precalcobjectlist.forEach(function(entry) {
      ctx.fillStyle = entry.color;
      ctx.fillRect(entry.left,entry.top,entry.width,entry.height);
    });
    calcGravitationsbeschleunigung();
    doInteractions();
    if (dead) {
      circle.x = startpoint.x;
      circle.y = startpoint.y;
      dead = false;
    } else {
      calcCirclePos();
    }
    */
}
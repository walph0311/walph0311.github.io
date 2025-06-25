/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  let walker = {
    width : $("#walker").width(),
    height: $("#walker").height(),
    positionX : 0,
    positionY : 0,
    speedX : 0,
    speedY: 0,
    
  }
  
  // Game Item Objects
  const KEY = {
    ArrowDown : 40,
    ArrowUp : 38,
    ArrowLeft : 37,
    ArrowRight : 39,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', keyup);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log(event.which)
    if (event.which === KEY.ArrowDown){
     walker.speedY = 5
    }
    else if (event.which === KEY.ArrowLeft){
      walker.speedX = -5
    }
    else if (event.which === KEY.ArrowRight){
      walker.speedX = 5
    }
    else if (event.which === KEY.ArrowUp){
      walker.speedY = -5
    }
  }

  function keyup(event){
    if (event.which !== KEY.ArrowDown || event.which !== KEY.ArrowLeft || event.which !== KEY.ArrowRight || event.which !== KEY.ArrowUp){
      walker.speedY = 0;
      walker.speedX = 0;
    }
  }

  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function wallCollision(){
    if (walker.positionX < 0){
      walker.positionX = 0
    }
    if (walker.positionX > $("#board").width()-walker.width){
      walker.positionX = $("#board").width() - walker.width
    }
    if (walker.positionY < 0){
      walker.positionY = 0
    }
    if (walker.positionY > $("#board").height() - walker.height){
      walker.positionY = $("#board").height() - walker.height
    }
  }

  function repositionGameItem(){
    walker.positionX += walker.speedX; // update the position of the box along the x-axis
    walker.positionY += walker.speedY; // update the position of the box along the x-axis
  }

  function redrawGameItem(){
    $("#walker").css("left", walker.positionX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.positionY); // draw the box in the new location, positionX pixels away from the "left"
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

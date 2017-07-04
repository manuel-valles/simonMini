$(function(){

	var colors = ["green", "red", "blue", "yellow"],
		greenSound = new Audio("media/simonSound1.mp3"),
		redSound = new Audio("media/simonSound2.mp3"),
		yellowSound = new Audio("media/simonSound3.mp3"),
		blueSound = new Audio("media/simonSound4.mp3"),
		errorSound = new Audio("media/errorSound.mp3"),
		victorySound = new Audio("media/victorySound.mp3"),
		sequence = [],
		player = [],
		strict = true;
	
	$("#start").on("click", function(){
	  reset();
	  //In case the button reset hasn't been clicked:
	  $(".button").off();
	  game();
	});

	$("#reset").on("click", function(){
	  $("#counter").text("00");
	  reset();
	  // Remove sound.
	  $(".button").off();
	});

	function reset(){
		sequence = [];
		player = [];
	}

	$("#strict").on("click", function(){
	   if (strict == true){
	     strict = false;
	     $("#strict").html("Strict OFF");
	   } else if (strict == false){
	     strict = true;
	     $("#strict").html("Strict ON");
	   }
	});

	function game(){
	  addToSequence();
	  displaySequence();
	  $(".button").on("click", function(){
	    playSound(this.id);
	    $(this).addClass("lit").delay(1000).queue(function(){
	      $(this).removeClass("lit").dequeue();
	    });
	    player.push(this.id);
	    
	    for(var i in player){
	      if(sequence[i] !== player[i]){
	      	console.log(player, sequence);
	      	pauseSound(this.id);
	        errorSound.play();
	      	alert("Try Again!");
	      	if (strict == true){
	      	  reset();
	      	} else if (strict == false){
	      	  	player = [];
	        	setTimeout(function(){
	          		displaySequence();
	        	}, 1000);
	      	}
	      }
	    }
	    // If you get a series of 20 steps correct, you win!!.
	    if (player.length === 20) {
	    	victorySound.play();
	    	setTimeout(function(){
	      		alert("Congrats!! You beat Simon!!");
	        }, 1000);
	        reset();	
	    }
	    if (player.length === sequence.length) {
	      player = [];
	      addToSequence();
	      setTimeout(function(){
	         displaySequence();
	      }, 1500);
	    }
	  });
	}

	function addToSequence(){
		var randomNum = Math.floor(Math.random() * 4);
	    sequence.push(colors[randomNum]);
	}

	function displaySequence() {
	    $("#counter").text("0"+sequence.length);
	    var level = 1;
	    display(sequence[0]);
	    function display(color) {
	      playSound(color);
	      var effect = $("#" + color).addClass("lit").delay(800).queue(function(){
	        $("#" + color).removeClass("lit").dequeue();
	      }, 1000);
	      $.when(effect).done(function() {
	        if (level < sequence.length) {
	          level++;
	          display(sequence[level-1]);
	        }
	      });
	    }
	}

	function playSound(color){
	    if(color === "green"){
	      greenSound.play();
	    }
	    if(color === "red"){
	      redSound.play();
	    }
	    if(color === "yellow"){
	      yellowSound.play();
	    }
	    if(color === "blue"){
	      blueSound.play();
	    }
	}

	function pauseSound(color){
	    if(color === "green"){
	      greenSound.pause();
	    }
	    if(color === "red"){
	      redSound.pause();
	    }
	    if(color === "yellow"){
	      yellowSound.pause();
	    }
	    if(color === "blue"){
	      blueSound.pause();
	    }
	}

});

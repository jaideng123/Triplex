//updates graphical board
var update_board = function(board){
	for (var i = board.length - 1; i >= 0; i--) {
		for (var j = board[i].length - 1; j >= 0; j--) {
			$('#'+levels[i] + (j+1)).html(symbols[board[i][j]]);
		};
	};
	var leftVals = $('form#left span.remaining')
	for (var i = leftVals.length - 1; i >= 0; i--) {
		if(i == leftVals.length - 1)
			leftVals.eq(i).html(pieces[6]);
		else
			leftVals.eq(i).html(pieces[i]);
	};
	var rightVals = $('form#right span.remaining')
	for (var i = rightVals.length - 1; i >= 0; i--) {
		if(i == rightVals.length - 1)
			rightVals.eq(i).html(pieces[7]);
		else
			rightVals.eq(i).html(pieces[i+3]);
	};
};
//grabs currently selected shape
var findCurrentSymbol = function(turn){
	if(turn == 0)
  		return symbolNames.indexOf($('input[name="shape-left"]:checked').val());
  	if(turn == 1)
  		return symbolNames.indexOf($('input[name="shape-right"]:checked').val());
};
//move to next turn
var nextTurn = function(){
	if(turn == 0){
		$('.active-player#p1').css('visibility','hidden')
		$('.left-player form input').attr('disabled',true);
	}
	else if(turn == 1){
		$('.active-player#p2').css('visibility','hidden')
		$('.right-player form input').attr('disabled',true);
	}
	turn = (turn + 1)% 2
	if(turn == 0){
		$('.active-player#p1').css('visibility','visible')
		if(phase == 1)
			$('.left-player form input').attr('disabled',false);
	}
	else if(turn == 1){
		$('.active-player#p2').css('visibility','visible')
		if(phase == 1)
			$('.right-player form input').attr('disabled',false);
	}
}
//checks if piece is owned by current player
var pieceAllowed = function(piece){
	if(piece == 0)
		return true;
	for (var i = allowedPieces[turn].length - 1; i >= 0; i--) {
		if(allowedPieces[turn][i] == piece)
			return true;
	};
	return false;
}
var markMatched = function(i,j,player){
	if(player == 0){
		$('#'+levels[i]+(j+1)).addClass('marked-blue')
	}
	if(player == 1){
		$('#'+levels[i]+(j+1)).addClass('marked-red')
	}
}
//checks for matches in all directions
var findLine = function(piece,board,i,j){
	var wildCard = 7;
	if(piece > 3 && piece != 7)
		wildCard = 8;
	//check up/down boards
	if(i == 0){
		if((board[i+1][j] == piece || board[i+1][j] == wildCard) && (board[i+2][j] == piece || board[i+2][j] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i+1,j,wildCard-7);
			markMatched(i+2,j,wildCard-7);
			return true;
		}
	}
	else if(i == 1){
		if((board[i-1][j] == piece || board[i-1][j] == wildCard) && (board[i+1][j] == piece || board[i+1][j] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i-1,j,wildCard-7);
			markMatched(i+1,j,wildCard-7);
			return true;
		}
	}
	else if(i == 2){
		if((board[i-1][j] == piece || board[i-1][j] == wildCard) && (board[i-2][j] == piece || board[i-2][j] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i-1,j,wildCard-7);
			markMatched(i-2,j,wildCard-7);
			return true;
		}
	}
	//check vertically
	if(j < 3){
		if((board[i][j+3] == piece || board[i][j+3] == wildCard) && (board[i][j+6] == piece || board[i][j+6] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j+3,wildCard-7);
			markMatched(i,j+6,wildCard-7);
			return true;
		}
	}
	else if(j < 6){
		if((board[i][j+3] == piece || board[i][j+3] == wildCard) && (board[i][j-3] == piece || board[i][j-3] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j+3,wildCard-7);
			markMatched(i,j-3,wildCard-7);
			return true;
		}
	}
	else{
		if((board[i][j-6] == piece || board[i][j-6] == wildCard) && (board[i][j-3] == piece || board[i][j-3] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j-3,wildCard-7);
			markMatched(i,j-6,wildCard-7);
			return true;
		}
	}
	//check horizontally
	if(j % 3 == 0){
		if((board[i][j+1] == piece || board[i][j+1] == wildCard) && (board[i][j+2] == piece || board[i][j+2] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j+1,wildCard-7);
			markMatched(i,j+2,wildCard-7);
			return true;
		}
	}
	else if(j % 3 == 1){
		if((board[i][j+1] == piece || board[i][j+1] == wildCard) && (board[i][j-1] == piece || board[i][j-1] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j+1,wildCard-7);
			markMatched(i,j-1,wildCard-7);
			return true;
		}
	}
	else if(j % 3 == 2){
		if((board[i][j-1] == piece || board[i][j-1] == wildCard) && (board[i][j-2] == piece || board[i][j-2] == wildCard)){
			markMatched(i,j,wildCard-7);
			markMatched(i,j-1,wildCard-7);
			markMatched(i,j-2,wildCard-7);
			return true;
		}
	}
	return false;
}
//checks board for matched pieces
var checkBoard = function(board){
	var matched = [0,0,0,0,0,0]
	$(".grid-btn").removeClass('marked-red');
	$(".grid-btn").removeClass('marked-blue');
	for (var i = board.length - 1; i >= 0; i--) {
		for (var j = board[i].length - 1; j >= 0; j--) {
			if(board[i][j] != 0){
				if(findLine(board[i][j],board,i,j))
					matched[board[i][j]-1] = 1;
			}
		};
	};
	return matched;
}
var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var levels = ['T','M','B'];
var symbols = ['X','<i class="fa fa-caret-up left fa-2x"></i>','<i class="fa fa-square left fa-2x"></i>','<i class="fa fa-circle left fa-2x"></i>',
'<i class="fa fa-caret-up right fa-2x"></i>','<i class="fa fa-square right fa-2x"></i>','<i class="fa fa-circle right fa-2x"></i>','<i class="fa fa-star left fa-2x"></i>','<i class="fa fa-star right fa-2x"></i>'];
var symbolNames = ['','triangle','square','circle','triangle-b','square-b','circle-b','wild','wild-b'];
var pieces = [3,3,3,3,3,3,1,1];
var allowedPieces = [[1,2,3,7],[4,5,6,8]];
var turn = 0;
var lastBtn = null;
var phase = 1;
$(document).ready(function(){
	$('.right-player form input').attr('disabled',true);
	$('.left-player form input').attr('disabled',false);
	update_board(board);
	$('.grid-btn').click(function() {
		//initial dist. of pieces
  		if(phase == 1){
	  		if(pieces[findCurrentSymbol(turn)-1] > 0 && board[levels.indexOf(this.id[0])][this.id[1]-1] == 0){
	  			board[levels.indexOf(this.id[0])][this.id[1]-1] = findCurrentSymbol(turn);
	  			pieces[findCurrentSymbol(turn)-1]--;
	  			update_board(board);
	  			var score = checkBoard(board);
	  			if(score[0] == 1 && score[1] == 1 && score[2] == 1){
	  				$('.active-player').css('visibility','hidden')
	  				console.log("Blue Player Wins!");
	  				phase = 3;
	  			}
	  			else if(score[3] == 1 && score[4] == 1 && score[5] == 1){
	  				$('.active-player').css('visibility','hidden')
	  				console.log("Red Player Wins!");
	  				phase = 3;
	  			}
	  			else{
		  			nextTurn();
		  			var sum = pieces.reduce(function(a, b) {
	  					return a + b;
					});
		  			if(sum == 0){
		  				phase++;
		  				$("form i").css("background", "none");
		  				$("form i").css("color", "grey");
		  				$("form").css("color", "grey");
		  				$("form").css("color", "grey");
		  				$("form input").prop("disabled", true);
		  			}
	  			}
	  		}
  		}
  		//all pieces on board
  		else if(phase == 2){
  			var pieceType = board[levels.indexOf(this.id[0])][this.id[1]-1]
  			if(pieceAllowed(pieceType) && pieceType != 0){
  				if(lastBtn != null){
  					$(lastBtn).css('background-color','#F0F0F0');
  				}
  				lastBtn = this;
  				$(this).css('background-color','green');
  			}
  			else if(lastBtn != null && pieceType == 0){
  				var prev = board[levels.indexOf(this.id[0])][this.id[1]-1];
  				board[levels.indexOf(this.id[0])][this.id[1]-1] = board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1];
  				board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1] = prev;
  				update_board(board);
  				$(lastBtn).css('background-color','#F0F0F0');
	  			lastBtn = null;
	  			var score = checkBoard(board);
	  			if(score[0] == 1 && score[1] == 1 && score[2] == 1){
	  				$('.active-player').css('visibility','hidden')
	  				$('.winner').text("Blue Player Wins!");
	  				phase = 3;
	  			}
	  			else if(score[3] == 1 && score[4] == 1 && score[5] == 1){
	  				$('.active-player').css('visibility','hidden')
	  				$('.winner').text("Red Player Wins!");
	  				phase = 3;
	  			}
	  			else
	  				nextTurn();
  			}
  		}
  		//game finished
  		else if(phase == 3){

  		}
	});

});
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
var findCurrentSymbol = function(turn){
	if(turn == 0)
  		return symbolNames.indexOf($('input[name="shape-left"]:checked').val());
  	if(turn == 1)
  		return symbolNames.indexOf($('input[name="shape-right"]:checked').val());
};
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
		$('.left-player form input').attr('disabled',false);
	}
	else if(turn == 1){
		$('.active-player#p2').css('visibility','visible')
		$('.right-player form input').attr('disabled',false);
	}
}
var pieceAllowed = function(piece){
	if(piece == 0)
		return true;
	for (var i = allowedPieces[turn].length - 1; i >= 0; i--) {
		if(allowedPieces[turn][i] == piece)
			return true;
	};
	return false;

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
	  			nextTurn();
	  			var sum = pieces.reduce(function(a, b) {
  					return a + b;
				});
	  			if(sum == 0){
	  				phase++;
	  			}
	  		}
  		}
  		//all pieces on board
  		else if(phase == 2){
  			var pieceType = board[levels.indexOf(this.id[0])][this.id[1]-1]
  			if(lastBtn == null && pieceAllowed(pieceType) && pieceType != 0){
  				lastBtn = this;
  				$(this).css('background-color','green');
  			}
  			else if(lastBtn != null && pieceType == 0){
  				var prev = board[levels.indexOf(this.id[0])][this.id[1]-1];
  				board[levels.indexOf(this.id[0])][this.id[1]-1] = board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1];
  				board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1] = prev;
  				update_board(board);
	  			nextTurn();
	  			$(lastBtn).css('background-color','white');
	  			lastBtn = null;
  			}
  		}
	});

});
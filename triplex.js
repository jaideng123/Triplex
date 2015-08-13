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
var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var levels = ['T','M','B'];
var symbols = ['X','<i class="fa fa-caret-square-o-up fa-2x"></i>','<i class="fa fa-square-o fa-2x"></i>','<i class="fa fa-circle-o fa-2x"></i>',
'<i class="fa fa-caret-up fa-2x"></i>','<i class="fa fa-square fa-2x"></i>','<i class="fa fa-circle fa-2x"></i>','<i class="fa fa-star-o fa-2x"></i>','<i class="fa fa-star fa-2x"></i>'];
var symbolNames = ['','triangle','square','circle','triangle-b','square-b','circle-b','wild','wild-b'];
var pieces = [3,3,3,3,3,3,1,1]
var turn = 0;
var lastBtn = null;
var phase = 1;
$(document).ready(function(){
	$('.right-player form input').attr('disabled',true);
	update_board(board);
	$('.grid-btn').click(function() {
		//initial dist. of pieces
  		if(phase == 1){
	  		if(pieces[findCurrentSymbol(turn)-1] > 0){
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
  			if(lastBtn == null){
  				lastBtn = this;
  				console.log(this);
  			}
  			else{
  				var prev = board[levels.indexOf(this.id[0])][this.id[1]-1];
  				board[levels.indexOf(this.id[0])][this.id[1]-1] = board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1];
  				board[levels.indexOf(lastBtn.id[0])][lastBtn.id[1]-1] = prev;
  				update_board(board);
	  			nextTurn();
	  			lastBtn = null;
  			}
  		}
	});

});
var update_board = function(board){
	for (var i = board.length - 1; i >= 0; i--) {
		for (var j = board[i].length - 1; j >= 0; j--) {
			$('#'+levels[i] + (j+1)).html(symbols[board[i][j]]);
		};
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
var turn = 0;
$(document).ready(function(){
	$('.right-player form input').attr('disabled',true);
	update_board(board);
	$('.grid-btn').click(function() {
  		console.log("Clicked: " + this.id);
  		board[levels.indexOf(this.id[0])][this.id[1]-1] = findCurrentSymbol(turn);
  		update_board(board);
  		nextTurn();
	});

});
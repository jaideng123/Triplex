var update_board = function(board){
	for (var i = board.length - 1; i >= 0; i--) {
		for (var j = board[i].length - 1; j >= 0; j--) {
			$('#'+levels[i] + (j+1)).html(symbols[board[i][j]]);
		};
	};
};
var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var levels = ['T','M','B'];
var symbols = ['X','<i class="fa fa-caret-square-o-up fa-2x"></i>','<i class="fa fa-square-o fa-2x"></i>','<i class="fa fa-circle-o fa-2x"></i>',
'<i class="fa fa-caret-up fa-2x"></i>','<i class="fa fa-square fa-2x"></i>','<i class="fa fa-circle fa-2x"></i>','<i class="fa fa-star-o fa-2x"></i>','<i class="fa fa-star fa-2x"></i>'];
$(document).ready(function(){
	$('.right-player form input').attr('disabled',true);
	update_board(board);
});
var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance based on pawn color
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Check if the move is valid
    if (targetPosition.col === currentCol) {
        // Moving straight
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            // Regular one-square move
            return true;
        } else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            // Initial two-square move
            return true;
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
               targetPosition.row === (currentRow + moveDistance).toString() && this.Board.getPieceAt(targetPosition)!=false ) {
        console.log(this.Board.getPieceAt(targetPosition));
        // Diagonal capture (assuming there's an enemy piece, which should be checked in the main game logic)
        return true;
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for pawn");
    return false;
}

Pawn.prototype.moveTo = function(targetPosition){    
    console.log(targetPosition);
    console.log("Piece is :"+this.Board.getPieceAt(targetPosition));
    // console.log(this);
    // console.log(this.Board.turn);
    // console.log(this.color);
    if(this.isValidPosition(targetPosition)&& this.Board.turn===this.color){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        if(this.color === 'white'){
            this.Board.turn = 'black';
        }else{
            this.Board.turn = 'white';
        }
    }else{
        //NOOP
    }
    
}
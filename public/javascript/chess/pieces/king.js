var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});

King.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance 
    let allowedMoves = [
        { col: currentCol, row: (currentRow + 1).toString() },
        { col: currentCol, row: (currentRow - 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: currentRow.toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: currentRow.toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: (currentRow + 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: (currentRow + 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: (currentRow - 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: (currentRow - 1).toString() },
    ];

    // Check if the move is valid
    for (let move of allowedMoves) {
        if (move.col === targetPosition.col && move.row === targetPosition.row) {
            return true;
        }
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for king");
    return false;
}

King.prototype.moveTo = function(targetPosition){    
    if(this.isValidPosition(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }else{
        //NOOP
    }
    
}
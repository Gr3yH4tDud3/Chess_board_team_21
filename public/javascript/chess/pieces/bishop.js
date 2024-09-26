var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

// Check if the position is valid for a bishop move
Bishop.prototype.isValidPosition = function(targetPosition) {
    
    if (!targetPosition || !targetPosition.col || !targetPosition.row) {
        console.warn("Invalid targetPosition:", targetPosition);
        return false;
    }

    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal
    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow)) {
        let colDirection = (targetCol.charCodeAt(0) > currentCol.charCodeAt(0)) ? 1 : -1;
        let rowDirection = (targetRow > currentRow) ? 1 : -1;

        // Traverse the diagonal and check for any pieces
        let currentColCode = currentCol.charCodeAt(0) + colDirection;
        let currentRowIter = currentRow + rowDirection;
        while (currentColCode !== targetCol.charCodeAt(0) && currentRowIter !== targetRow) {
            let checkCol = String.fromCharCode(currentColCode);
            let checkRow = currentRowIter;

            if (this.Board.getPieceAt({ col: checkCol, row: checkRow })) {
                return false; // A piece is blocking the way
            }

            currentColCode += colDirection;
            currentRowIter += rowDirection;
        }

        return true;
    }

    console.warn("Invalid move for Bishop");
    return false;
};


Bishop.prototype.moveTo = function(targetPosition) {
    console.log(this);
    if (this.isValidPosition(targetPosition) && this.Board.turn === this.color) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        if (this.color === 'white') {
            this.Board.turn = 'black';
        } else {
            this.Board.turn = 'white';
        }
    } else {
        console.warn("Invalid move or not your turn");
    }
};

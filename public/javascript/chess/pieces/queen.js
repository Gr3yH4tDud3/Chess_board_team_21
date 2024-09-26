var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

// Check if the position is valid for a queen move
Queen.prototype.isValidPosition = function(targetPosition) {
    
    if (!targetPosition || !targetPosition.col || !targetPosition.row) {
        console.warn("Invalid targetPosition:", targetPosition);
        return false;
    }

    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal, horizontal, or vertical
    let isDiagonalMove = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow);
    let isVerticalMove = currentCol === targetCol;
    let isHorizontalMove = currentRow === targetRow;

    if (isDiagonalMove || isVerticalMove || isHorizontalMove) {
        let colDirection = (targetCol.charCodeAt(0) > currentCol.charCodeAt(0)) ? 1 : (targetCol.charCodeAt(0) < currentCol.charCodeAt(0)) ? -1 : 0;
        let rowDirection = (targetRow > currentRow) ? 1 : (targetRow < currentRow) ? -1 : 0;

        // Traverse the path (diagonal, horizontal, or vertical) and check for any pieces blocking the way
        let currentColCode = currentCol.charCodeAt(0) + colDirection;
        let currentRowIter = currentRow + rowDirection;
        while ((colDirection !== 0 && currentColCode !== targetCol.charCodeAt(0)) || 
               (rowDirection !== 0 && currentRowIter !== targetRow)) {
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

    console.warn("Invalid move for Queen");
    return false;
};

Queen.prototype.moveTo = function(targetPosition) {
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

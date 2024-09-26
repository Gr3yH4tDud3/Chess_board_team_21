var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(targetPosition) {
    
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    
    if (currentCol === targetCol) {
        return true; 
    } else if (currentRow === targetRow) {
        return true;
    }
    console.warn("Invalid move for rook");
    return false;
};

Rook.prototype.moveTo = function(targetPosition) {
   
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render(); 
    } else {
        console.warn("Rook cannot move to the selected position");
    }
};

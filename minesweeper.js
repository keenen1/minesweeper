document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = generateBoard(5);

var clickSound = new Audio();
clickSound.src = "audio/mouse_click.mp3";

function startGame () {
  // loop though the board.cells array
  // count the surrouding mines in each cell
  // assign the count to a new property in each cell
  var gameBoard = board.cells;
  

  for (var i=0; i<gameBoard.length; i++){
    gameBoard[i].surroundingMines = countSurroundingMines(gameBoard[i]);
  }

  //Check for win with left click
  document.addEventListener('click', checkForWin);
  //Check for win with right click
  document.addEventListener('contextmenu', checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard();
}

// Generate Cell Properties
function generateCells (row, col, mine, marked, hidden) {
  var cells = {
    row: row,
    col: col,
    isMine: mine,
    isMarked: marked,
    hidden: hidden
  }
  return cells;
}

// Generate Board
function generateBoard (num) {
  var board = {}; // initialize board
  var tempCell = []; // temporary array to store generated properties
  var mineCount = Math.floor((num*num)/3); // number of mines relative to size of the board
  
 
  for (var row = 0; row < num; row++){ // populate rows
    for (var col = 0; col < num; col++){ // populate colums
      var tempMine = (Math.floor(Math.random() * (num*num)))%3;
      if (tempMine == 0 && mineCount != 0){
        tempCell.push(generateCells(row, col, true, false, true));
        mineCount--;
      }else{
        tempCell.push(generateCells(row, col, false, false, true));
      }
    }
  }

  board.cells = tempCell; // initialise cell property in board object and assign tempCell to it
  
  console.log("Total Cells: " + board.cells.length);
  console.log("Board: " + board.cells);
  return board;
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  let gameBoard = board.cells;
  var win = 0;
  for (var i=0; i<gameBoard.length; i++) {
    if (gameBoard[i].isMine == true && gameBoard[i].isMarked == true){
      win++;
    }
    if (gameBoard[i].isMine == false && gameBoard[i].hidden == false){
      win++;
    }
  }


  var lost = document.getElementById("lostGame");
  for (var i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i].isMine == true && gameBoard[i].hidden == false){
      lost.play();
    }
  }
  

  

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  var won = document.getElementById("wonGame");
  if (win == gameBoard.length){
    won.play();
    lib.displayMessage('YOU MUST BE THE CHOSEN ONE');
    // console.log("You Win!");
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (win == gameBoard.length){

    lib.displayMessage('You win!');
    console.log("You Win!");
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//

//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++;
    }
  }
  return count;
}

function resetGame () {
  location.reload();
}


let gameGrid = document.querySelectorAll(".gamegrid");
gameGrid.forEach(element => element.addEventListener("click", playSquare));
const gameBoard = (() => {
    const board =    [null,null,null,
                   null,null,null,
                   null,null,null];
    const updateBoard = (space, marker) => board[space] = marker;
    const resetBoard = () => {for(let i = 0; i < board.length; i++){
        board[i] = null;
        };
    };
    const clearDisplay = function(){
        document.querySelectorAll(".marker").forEach(item => item.remove());
    };
    return {
        board, updateBoard, resetBoard, clearDisplay
    };
})();
const gamepieces = (marker, coordinate) => {
    //pseudo: createElement appendChild(marker)@coordinate checkIfsquare isOccupied
    let whereTo = document.getElementById("g"+coordinate);
    let newPiece = document.createElement("img");
    newPiece.src ="images/"+marker+"mark.svg";
    newPiece.classList.add("marker");
    whereTo.appendChild(newPiece);
    gameBoard.updateBoard(coordinate, marker);
    console.log(gameBoard);
    winConditions(marker);
}
function playSquare(){
    console.log(this.dataset.num);
    if(gameBoard.board[this.dataset.num] === null){
        const thisPiece = gamepieces("x", this.dataset.num);
        computerTurn();
    }
    else{
        console.log("you can't do that");
    }
}
function computerTurn(){
    var computerChoice = Math.floor(Math.random()*9);
    console.log(computerChoice);
    const nullCheck = (currentValue) => currentValue != null;
    if(gameBoard.board.every(nullCheck)){
        return
    }
    if(gameBoard.board[computerChoice] === null){
        const aiPiece = gamepieces("o", computerChoice);
        }
    else{
        computerTurn();
    }
}
function winConditions(marker){
    const checkWin = (currentValue) => currentValue === marker;
    let check = gameBoard.board;
    if(
        [check[0],check[1],check[2]].every(checkWin)||
        [check[0],check[3],check[6]].every(checkWin)||
        [check[0],check[4],check[8]].every(checkWin)||
        [check[0],check[3],check[6]].every(checkWin)||
        [check[3],check[4],check[5]].every(checkWin)||
        [check[6],check[7],check[8]].every(checkWin)||
        [check[6],check[4],check[2]].every(checkWin)||
        [check[6],check[4],check[2]].every(checkWin)||
        [check[2],check[5],check[8]].every(checkWin)||
        [check[1],check[4],check[7]].every(checkWin)){
            congratulateWinner(marker)
        }
}
function congratulateWinner(marker){
    console.log(marker + " wins!");
    for(let i = 0; i < gameBoard.board.length; i++){
        gameBoard.board[i] = "---";
    }
    let wrapper = document.createElement("div");
    let winnerTxt = document.createElement("h2");
    winnerTxt.innerHTML = marker + " wins!";
    wrapper.classList.add("winnerCard");
    wrapper.setAttribute("id", "winInfo");
    let winnerMark = new Image();
    winnerMark.src = "images/"+marker+"mark.svg";
    winnerMark.classList.add("winnerMark");
    wrapper.appendChild(winnerTxt);
    wrapper.appendChild(winnerMark);
    document.getElementById("winner").appendChild(wrapper);
    document.getElementById("winnerBox").classList.remove("hidden");
}
document.getElementById("newGame").addEventListener("click", gameBoard.resetBoard);
document.getElementById("newGame").addEventListener("click", gameBoard.clearDisplay);
document.getElementById("newGame").addEventListener("click", clearWin);
function clearWin(){
    document.getElementById("winInfo").remove();
}
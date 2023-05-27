

var canvas;
var ctx;



var score_sum = 0;
var runs = 0;
var score = 0;
var highscore = 0;

var completed_board = [];
var board = [];



const C_HEIGHT = 300;
const C_WIDTH = 300;    




 
function go() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    score = 0;
    doDrawing();

}

function getHighscore() {
    if (localStorage.getItem("highscore") != null) {
        highscore = parseInt(localStorage.getItem("highscore"));
    }
    if(score > highscore){
        highscore = score;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  

function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
}

function copyBoard() {
    var new_board = [];
    for(var i = 0; i < board.length; i++){
        var row = [];
        for(var j = 0; j < board[0].length; j++){
            row.push(board[j][i]);
        }
        new_board.push(row);
    }
    return new_board;
}
function makeBoardCopy(new_board) {
    var board_copy = [];
    for(var i = 0; i < new_board.length; i++){
        var row = [];
        for(var j = 0; j < new_board[0].length; j++){
            row.push(new_board[j][i]);
        }
        board_copy.push(row);
    }
    return board_copy;
}

function doDrawing(values=null) {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,C_WIDTH, C_HEIGHT);

    ctx.fillStyle = '#F9DC5C';
    var w = C_WIDTH/3;
    var h = C_HEIGHT/3;
    ctx.fillRect(w, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h, C_WIDTH, 5);
    ctx.fillRect(5, 2*h, C_WIDTH, 5);


    ctx.fillStyle = '#2D2422';
    var w2 = C_WIDTH/9;
    var h2 = C_HEIGHT/9;
    ctx.fillRect(w2, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(4*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(7*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(8*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h2, C_WIDTH, 5);
    ctx.fillRect(5, 2*h2, C_WIDTH, 5);
    ctx.fillRect(5, 4*h2, C_WIDTH, 5);
    ctx.fillRect(5, 5*h2, C_WIDTH, 5);
    ctx.fillRect(5, 7*h2, C_WIDTH, 5);
    ctx.fillRect(5, 8*h2, C_WIDTH, 5);


    fillNumbers(values);

}

async function parseBoard(boardTxt){
    console.log("async function parseBoard(boardTxt){");
    board = [];
    const boardArray = boardTxt.split("\n");
    for(var i = 0; i < boardArray.length; i++){
        row = [];
        for(var j = 0; j < boardArray[i].length; j++){
            var num = boardArray[i][j];
            row.push(Number(parseInt(num)));
        }
        board.push(row);
    }
    return board;
}

async function getBoard(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/FlyingBunny92/Sudoku_Javascript/main/easy.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return  Promise.resolve(parseBoard(request.responseText));
            }
        }
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        console.log(textFromFileLoaded);
        doDrawing(textFromFileLoaded);
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
}


function clearBoard() {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,C_WIDTH, C_HEIGHT);

    ctx.fillStyle = '#F9DC5C';
    var w = C_WIDTH/3;
    var h = C_HEIGHT/3;
    ctx.fillRect(w, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h, C_WIDTH, 5);
    ctx.fillRect(5, 2*h, C_WIDTH, 5);


    ctx.fillStyle = '#2D2422';
    var w2 = C_WIDTH/9;
    var h2 = C_HEIGHT/9;
    ctx.fillRect(w2, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(4*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(7*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(8*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h2, C_WIDTH, 5);
    ctx.fillRect(5, 2*h2, C_WIDTH, 5);
    ctx.fillRect(5, 4*h2, C_WIDTH, 5);
    ctx.fillRect(5, 5*h2, C_WIDTH, 5);
    ctx.fillRect(5, 7*h2, C_WIDTH, 5);
    ctx.fillRect(5, 8*h2, C_WIDTH, 5);
}

async function fillNumbers(values=null) {
    board = [];
    console.log("async function fillNumbers(values=null) {");
    console.log("values:", values);
    var x0 = 15;
    var y0 = 25;
    var x_delta = 33;
    var y_delta = 33;
    ctx.font = "bold 12px verdana, sans-serif ";
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#73C6B6"; 
    if(values==null){
        let response = await getBoard();
        console.log("response:", response);
    }else{
        let response = await Promise.resolve(parseBoard(values));
        console.log("response:", response);
        console.log("board:", board);
    }

    while(board.length < 1){
        await sleep(1000);
    }

    var new_board = makeBoardCopy(board);
    console.log("new_board:", new_board);
    var solved_board = solver(new_board);
    console.log("new_board:", new_board);
    console.log("solved_board:");
    console.log(solved_board);
    clearBoard();
    await sleep(1000);
    
    for(var g = 0; g < board.length; g++){
        for(var h = 0; h < board[0].length; h++){
            ctx.fillText(new_board[g][h], x0+(g*x_delta), y0+(h*y_delta));
        }
    }


}

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}


function findEmptySpot(board) {
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(board[i][j] == 0){
                return [i,j];
            }
        }
    }
    return [-1,-1];
}


function solver(data) {
    var pos = findEmptySpot(data);
    var i = pos[0];
    var j = pos[1];
    console.log("i:", i); 
    console.log("j:", j); 
    if((i == -1) || (j == -1)){
        return true;
    }
    for(var k = 1; k <= 9; k++){
        if(isValid(data, i, j, k)){
            data[i][j] = k;
            if(solver(data)){
                return true;
            }else{
                data[i][j] = 0;
            }
        }
    }
    return false;
}






var board=[];
var rows=8;
var columns=8;


var minesCount=10;
var minesLocation=[];

var tilesCliked=0;

var flagEnabled=false;

var gameOver=false;

window.onload=function(){
    startGame()
}
function setMines(){
    // minesLocation.push("2-2")
    // minesLocation.push('2-3')
    // minesLocation.push('6-6')
    // minesLocation.push('3-3')
    // minesLocation.push('2-1')
    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}
function startGame(){
    document.getElementById('mines-count').innerText=minesCount;
document.getElementById('flag-button').addEventListener('click',setFlag)
setMines();
for(let r=0;r<rows;r++){
    let row=[]
    for(let c=0;c<columns;c++){
        let tile=document.createElement("div")
      
        tile.id=r.toString()+"-"+c.toString();
       tile.addEventListener('click',clickTile)
        document.getElementById("board").append(tile)
        row.push(tile)
    
    }
    board.push(row)
}
console.log(board)
}

function setFlag(){
    if(flagEnabled){
        flagEnabled=false;
        document.getElementById('flag-button').style.backgroundColor="lightgray";
    }else{
        flagEnabled=true;
        document.getElementById('flag-button').style.backgroundColor="darkgray"
    }
}

function clickTile(){
    if(gameOver||this.classList.contains('title-clicked')){
        return;
    }
  let tile=this;
  if(flagEnabled){
    if(tile.innerText==""){
        tile.innerText="🚩"
    }
    else if(tile.innerText=="🚩"){
        tile.innerText="";
    }
    return;
  }  
  if(minesLocation.includes(tile.id)){
    alert('GAME OVER')

    revealMines();
    gameOver=true
    return;
  }
  let coards=tile.id.split('-');
  let r=parseInt(coards[0]);
  let e=parseInt(coards[1])
  checkMines(r,e)

}
function revealMines(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
       let tile=board[r][c];
       if(minesLocation.includes(tile.id)){
        tile.innerText="💣";
        tile.style.backgroundColor="red"
       }
    }
    }
}


function checkMines(r,c){
    if(r<0||r>=rows||c<0||c>=columns){
        return;
    }
    if(board[r][c].classList.contains("title-clicked")){
        return;
    }
    board[r][c].classList.add("title-clicked")

    tilesCliked+=1;
    let minesFound=0;
    //top all
    minesFound+=checkTile(r-1,c-1);//left
    minesFound+=checkTile(r-1,c);//just top
    minesFound+=checkTile(r-1,c+1);//right
    //left and right
    minesFound+=checkTile(r,c-1);//left
    minesFound+=checkTile(r,c+1);//right

    //bottom
    minesFound+=checkTile(r+1,c-1);//left
    minesFound+=checkTile(r+1,c);//just bottom
    minesFound+=checkTile(r+1,c+1);//bottom right

    if(minesFound>0){
        board[r][c].innerText=minesFound;
        board[r][c].classList.add('x'+minesFound.toString())
    }
    else{
        //top3
        checkMines(r-1,c-1)
        checkMines(r-1,c)
        checkMines(r-1,c+1)

   checkTile(r,c-1);//left
 checkTile(r,c+1);//right

    //bottom
  checkTile(r+1,c-1);//left
checkTile(r+1,c);//just bottom
    checkTile(r+1,c+1);//bottom right
    }
    if(tilesCliked==rows+columns-minesCount){
        document.getElementById("mines-count").innerText='Clearded'
    gameOver=true;
    }
}


function checkTile(r,c){

    if(r<0||r>=rows||c<0||c>=columns){
        return 0;
    }
    if(minesLocation.includes(r.toString()+"-"+c.toString())){
        return 1;
    }
    return 0;
}




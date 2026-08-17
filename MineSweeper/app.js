let grid=[];
let size=12;
let  ismine=true;
 let bombCount=16;
 let revealed_cells=0;
 let timeleft;
 let start=false;
 let totaltime=300;
 timeleft=totaltime;
 let liveCount=3;
let score=0;
let highScore=0;
let lives=document.getElementById("lives");
let hintCount=3;
let livesbreak=document.querySelector(".Lives");

 function starttimer(){
    if(start==false){
        return;
    }
    if(start==true){
timeinterval= setInterval( () => {
    timeleft--;
document.getElementById("timer").innerText=timeleft;
if(timeleft<=0)
{
    stop();
    alert("Time's up!Game Over");
    disboxes();
}
}, 1000);
 }
} 
let hintBtn=document.querySelector("#hint");
hintBtn.addEventListener("click",()=>{
    if(hintCount<=0){
        alert("No Hints left");
        return;
    }
    let foundcell=false;
    let randomrow,randomcol;
    while(!foundcell)//jab tak kai na milai safe cell tab tak
    {
        randomrow=Math.floor(Math.random()*size);
         randomcol=Math.floor(Math.random()*size);

    
    //aisa cell joh abhi khula bhi na hu aur os per mine bhi na hu 
    if(grid[randomrow][randomcol].found==false &&grid[randomrow][randomcol].ismine==false )
        {
        foundcell=true;
    }
}
checkMine(randomrow,randomcol);
// check Mine se expose kia 
hintCount--;
document.getElementById("hints").innerText=hintCount;}
)
highScore=localStorage.getItem("minesweeperHighScore")||0;
document.getElementById("high-score").innerText=highScore;
 function stop()
 {
    clearInterval(timeinterval);
    start=false;
}

function chechHighScore(){
      if(score>highScore){
            highScore=score;
            document.getElementById("high-score").innerText=highScore;
            localStorage.setItem("minesweeperHighScore",highScore);
        }
}
//  let neighbourMine
let board=document.querySelector(".grid-container");
function generateGrid(){
    board.innerHTML = ""; 
    grid = [];
    revealed_cells = 0;
for(let i=0;i<size;i++){
    grid[i]=[];//hum nai rows ko empty string dia 
    for(let j=0;j<size;j++){
      let button =document.createElement("button");
      button.classList.add("newbtn");
      board.appendChild(button);
   grid[i][j]={
    ismine:false,
    found:false,
    flagged:false,
    neighbourMine:0,
    element:button,
   };
   button.addEventListener("click",function(){
    if(start==false){
    start=true;
    starttimer();}
checkMine(i,j);
});
button.addEventListener("contextmenu",function(event){
        event.preventDefault();
        toggleflag(i,j);
    });
    }
    
}
let count=0;
while(count<bombCount){
   let  randomrow=Math.floor(Math.random()*size);
let randomcol=Math.floor(Math.random()*size);
if(grid[randomrow][randomcol].ismine===false){
    grid[randomrow][randomcol].ismine=true;
    console.log(`Mine placed at row ${randomrow} and at col. ${randomcol}`);
count++; 
}
}
}

const disboxes=()=>{
    for(let i=0;i<size;i++
)
{
    for(let j=0;j<size;j++){
        grid[i][j].element.disabled=true;
    }
    hintBtn.disabled=true;
}};
function WinGame(){
alert("Game Won!🎊");
disboxes();
stop();
chechHighScore();
}
function LoseGame(Cell){
   Cell.element.innerText = "💣";
   for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
        if(grid[i][j].ismine==true){
            grid[i][j].element.innerText = "💣";
            grid[i][j].element.style.backgroundColor="grey";
        }
    }
   }
        alert("Game Over! You clicked on a mine.");
        disboxes();
        stop();
chechHighScore();

}


function checkMine(row,col)
{
    let Cell = grid[row][col];
if(Cell.found==true || Cell.flagged==true)
    { //it tells whether thsi cell is already been checked or not 
   return;
   }
   Cell.found=true;
   if(Cell.ismine==true){
    if(liveCount!=0){
        Cell.element.innerText = "💣";
        liveCount--;
        lives.innerText=liveCount;
        livesbreak.classList.add("heart-break");
        
livesbreak.classList.add("heart-break");
setTimeout(()=>
livesbreak.classList.remove("heart-break"),500);
    }
    if(liveCount==0){
         lives.innerText=liveCount;
     LoseGame(Cell);   
    }
 Cell.element.style.backgroundColor = "red";
  return;
    }
    if(Cell.ismine==false){
        revealed_cells++;
    }

   let neighbor_bomb=0;// this no. will be displayed on the  button clicked 
//up-down-left-right traverse kerwanai kai lia we do this loop
for(let r=-1;r<=1;r++)
    {
for(let c=-1;c<=1;c++)
    {
    if(r==0 && c==0)
        {
    //box is itslef
    continue;
          }
let neighbor_row=  row + r;
let neighbor_col=col+c;
if(neighbor_row>=0 && neighbor_row<size  &&neighbor_col >= 0 && neighbor_col < size) 
    {

//boundary check so that grid sai bahir na jain
if (grid[neighbor_row][neighbor_col].ismine == true) 
    {
                   neighbor_bomb++;
                
                
                
                }
        }     }

    }


Cell.neighbourMine=neighbor_bomb;
if(neighbor_bomb>0){
    Cell.element.innerText=neighbor_bomb;
    score+=2;
    document.getElementById("score").innerText=score;
}
else{
    //agr bombCount zero howa tu 
     Cell.element.innerText="";
     score+=5;
     document.getElementById("score").innerText=score;

for(let r=-1;r<=1;r++)
    {
for(let c=-1;c<=1;c++)
    {
    if(r==0 && c==0)
        {
    //box is itslef
    continue;
          }
let neighbor_row=  row + r;
let neighbor_col=col+c;
if(neighbor_row>=0 && neighbor_row<size  &&neighbor_col >= 0 && neighbor_col < size) 
    {

//boundary check so that grid sai bahir na jain
if (!grid[neighbor_row][neighbor_col].found && !grid[neighbor_row][neighbor_col].ismine) 
    {
                  checkMine(neighbor_row,neighbor_col);
                
                
                
                }
               
        }     }

    }
}
 Cell.element.style.backgroundColor="maroon"; 
 if(revealed_cells==size*size -bombCount){
    WinGame();
 }
};
let reset=document.querySelector("#restart");
reset.addEventListener("click",()=>{
    stop();
  timeleft=totaltime;
    document.getElementById("timer").innerText=
    timeleft;
    score=0;
    hintCount=3;
    document.getElementById("hints").innerText=hintCount;
    hintBtn.disabled=false;
     document.getElementById("score").innerText=score;
generateGrid();
})
let newGame=document.querySelector(".New_Game");
function toggleflag(r,c){
    let cell=grid[r][c];
    if(cell.found==true){
        //cell is opne
        return;
    }
    //agr flag nahi hai 
    if(cell.flagged==false){
cell.flagged=true;
cell.element.innerText="🚩";
cell.element.style.backgroundColor="orange";
    }
    //agr already flagged hai
    else{
        cell.flagged=false;
cell.element.innerText="";
cell.element.style.backgroundColor="";
    }
}
generateGrid();




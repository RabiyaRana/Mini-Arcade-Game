let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#Reset");
let newbtn=document.querySelector("#New");
let msges=document.querySelector(".msg-es");
let msg=document.querySelector("#msg");
let turn1=true;// player A ki bari tu X 
let scoreX = localStorage.getItem("ttt_scoreX") ? parseInt(localStorage.getItem("ttt_scoreX")) : 0;
let scoreO = localStorage.getItem("ttt_scoreO") ? parseInt(localStorage.getItem("ttt_scoreO")) : 0;
let sc1=document.querySelector("#flipInnerX");
let sc2=document.querySelector("#flipInnerO");
if(sc1) sc1.innerText = scoreX;
if(sc2) sc2.innerText = scoreO;
let gameOver=false;
//2D array jis main winning patterns save ekr skain
const arr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];
const NewGame=()=>{
 turn1=true;
 gameOver=false;
    msges.classList.add("hide");
    enableboxes();
}
const resetGame=()=>{
    NewGame();
    scoreO=0;
    scoreX=0;
    sc1.innerText=0;
    sc2.innerText=0;
localStorage.removeItem("ttt_scoreX");
    localStorage.removeItem("ttt_scoreO");
}
boxes.forEach((box)=>{
box.addEventListener("click",()=>{
    if(!turn1 || box.innerText!=="" || gameOver)
        //jab computer ki turn hu ya woh box empty na hu 
        return;
              box.innerText="X";
    box.disabled=true;
     if(checkWinner()){
      return;}
       turn1=false;
       let compThink=document.getElementById
       ("comp-think");
       if(compThink)
        compThink.classList.remove("hide");
       setTimeout(()=>{
        computerTurn();
      if(compThink)
        compThink.classList.add("hide");
         },400);

});
});
const disboxes=()=>{
    for(let each of boxes){
        each.disabled=true;
    }
}
function updateScore(element,n_score){
element.classList.add("flipping");
setTimeout(()=>{
    element.innerText=n_score;
},200);
setTimeout(()=>{
    element.classList.remove("flipping");
},400);
}
const showWinner=(winner,Pattern)=>{
    gameOver=true;
    msg.innerText=`Congrats!!Winner is ${winner}`;
    if(winner=="X"){
        scoreX++;
        updateScore(document.getElementById("flipInnerX"),scoreX);
        // sc1.innerText=scoreX;
        localStorage.setItem("ttt_scoreX", scoreX);
    }
    else{
        scoreO++;
         updateScore(document.getElementById("flipInnerO"),scoreO);
       localStorage.setItem("ttt_scoreO", scoreO);
    }
    msges.classList.remove("hide");
    disboxes();
    Pattern.forEach((val)=>{
boxes[val].classList.add("winning_Cell");
    });
};
const SmartMove=(move)=>{
    for(let val of arr){
        let [a,b,c]=val;
        let pos1=boxes[a].innerText;
         let pos2=boxes[b].innerText;
          let pos3=boxes[c].innerText;
    
    if(pos1===move && pos2===move && pos3===""){ //hum dosray player ko rukna chah rhay kah agr os nai 2 boxes main apna symbol dala tu hum third box main apna symbol daal ker rukain gai
        return c;
    }
     if(pos1===move && pos3===move && pos2===""){ 
        return b;
    }
     if(pos2===move && pos3===move && pos1===""){
        return a;
    }
}
    return null;//agr koi possible pattern nahi mila tu 
};
const computerTurn=()=>{
    if(gameOver){
        return;
    }
    //first check if comp  can win
    let c_move=SmartMove('O');
    if(c_move===null){
        //agr comp ko apna winning move nahi mila tu hum user ko rukain gai 
        c_move=SmartMove('X');
    }
    //agr user kai jeetnay ak danger nahi hai tu randomly play kero
    if(c_move===null)
{//converted Nodelist into array 
    let freebox=[...boxes].filter(b=>b.innerText==="");
    if(freebox.length >0){
        let random_move=freebox[Math.floor(Math.random()*freebox.length)];
        c_move=[...boxes].indexOf(random_move);
    }
}
if(c_move!==null){
    boxes[c_move].innerText="O";
    boxes[c_move].disabled=true;
    if (checkWinner()) return;
}
turn1=true;//Player X ki bari
};
const checkWinner =(()=>{
for(let val of arr)

{ 
let pos1= boxes[val[0]].innerText;
let pos2= boxes[val[1]].innerText;
let pos3= boxes[val[2]].innerText;
if(pos1!=""&&pos2!=""&&pos3!=""){
    if(pos1==pos2 && pos2==pos3){
        console.log("winner",pos1);
        showWinner(pos1,val);
        return true;
}
}
}
let isDraw=[...boxes].every(box=>box.innerText!=="");
if(isDraw){
    gameOver=true;
msg.innerText="It's a Draw";
msges.classList.remove("hide");
disboxes();
return true;
}
return false;
});

const enableboxes=()=>{
    for(let each of boxes){
        each.disabled=false;
        each.innerText="";
        each.classList.remove("winning_Cell");
    }
}
if(newbtn) newbtn.addEventListener("click",NewGame);
 if(reset)reset.addEventListener("click",resetGame);    
let u_scr=0;
let c_scr=0;
let increase=1;
let streaks=document.querySelector("#streak");
let curr_streak=0;//user streak
let Uscore=document.querySelector("#user-score");
let Cscore=document.querySelector("#comp-score");
let msg=document.querySelector("#remark");
const choices=document.querySelectorAll(".choice");
const imageMap = {
    rock: "images/rock.png",
    paper: "images/paper.png",
    scissors: "images/scissors.jpg"
};
const compplay=()=>{
const options=["rock","paper","scissors"];
//math.random se hum nai koi bhi random choice keri 
const compid=Math.floor(Math.random()*3);
//aur phir os random ki value return kri 
return options[compid]; 
}
const UserWin=(choice1,choice2)=>{
    curr_streak++;
    if(curr_streak>=5){
        increase=3;
    }
     else if( curr_streak>=3){
        increase=2;
    }
    else{
        increase=1;
    }
   
    u_scr+=(1*increase);
    Uscore.innerText=u_scr;
    streaks.innerText=`🔥 Streak: ${curr_streak} (x${increase})`;
     msg.innerText= increase>1 ? `User win! 🔥x ${increase} COMBO! ${choice1} vs ${choice2} `: `User win!  🤓 ${choice1} vs ${choice2} `;

    msg.style.backgroundColor="green";
    msg.style.color="white";
}
const CompWin=(choice1,choice2)=>{

    msg.innerText=`Computer wins 🤖!  ${choice1} vs ${choice2}`;
     msg.style.backgroundColor="red";
      msg.style.color="white";
    c_scr++;
    Cscore.innerText=c_scr;
       curr_streak=0;
       increase=1;
       streaks.innerText=`🔥 Streak:0`;
}
const Draw=()=>{
 
     msg.innerText="It's a Draw! 😙";
       msg.style.backgroundColor="#462255";
             msg.style.color="#C3F3C0";
              curr_streak=0;
       increase=1;
       streaks.innerText=`🔥 Streak:0`;
}

const playGame=((uchoice)=>{
    const compChoice=compplay();   // SABSE PEHLE ye line
    
   document.getElementById("user-choice-img").src = imageMap[uchoice];
document.getElementById("comp-choice-img").src = imageMap[compChoice];
    
 if(uchoice===compChoice)
 {
 Draw();
 }
 else{
    if(uchoice==="rock"){
        if(compChoice=="paper"){
            CompWin(uchoice,compChoice);
        }
        else if(compChoice=="scissors"){
            UserWin(uchoice,compChoice);
        }
    }
    else if(uchoice==="paper"){
        if(compChoice=="rock"){
            UserWin(uchoice,compChoice);
        }
        else if(compChoice=="scissors"){
            CompWin(uchoice,compChoice);
        }
    }
    else{
        if(compChoice=="paper"){
            UserWin(uchoice,compChoice);
        }
        else if(compChoice=="rock"){
            CompWin(uchoice,compChoice);
        }
    }
 }
})
choices.forEach((choice)=>{
   
    choice.addEventListener("click",()=>{
        let id=choice.getAttribute("id");
        console.log("choice done",id);
        playGame(id); 

    })
})

//jis bhi number tak ki range chahiya hoti hai os se aik no. agai tak hum math.random() ko multiply kerwatay hain os tak
//Math.random()*10 -- 0 se 9 tk ki range
//decimal plcaes ko remove kernmai kai lia we can use
//Math.floor

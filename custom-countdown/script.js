const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById('countdownForm');
const dateEl=document.getElementById('date-picker');
const countdownEl=document.getElementById('countdown');
const countdownElTitle=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElement=document.querySelectorAll('span');
const completeEl=document.getElementById('complete');
const completeElinfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdownDate='';
let countdownValue=Date;
let countdownActive;
let savedCountdown;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

const today=new Date().toISOString().split('T')[0];
//console.log(today);
dateEl.setAttribute('min',today);

function updateDom(){
    countdownActive=setInterval(() =>{

        const now=new Date().getTime();
    console.log('now',now);
    const distance=countdownValue - now;
    console.log('distance',distance);
    const days=Math.floor(distance/day);
    const hours=Math.floor((distance%day)/hour);
    const minutes=Math.floor((distance%hour)/minute);
    const seconds=Math.floor((distance%minute)/second);
    console.log(days,hours,minutes,seconds);
    console.log(countdownElTitle);
    //console.log(timeElement[3]);
    inputContainer.hidden=true;
    if(distance<0){
        countdownEl.hidden='true';
        clearInterval(countdownActive);
        completeElinfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden=false;
    }else{

        countdownElTitle.textContent=`${countdownTitle}`;
        timeElement[0].textContent=`${days}`;
        timeElement[1].textContent=`${hours}`;
        timeElement[2].textContent=`${minutes}`;
        timeElement[3].textContent=`${seconds}`;
        completeEl.hidden=true;
        countdownEl.hidden=false;

    }

    


    countdownEl.hidden=false;
    },second);
}

function updateCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title:countdownTitle,
        date:countdownDate,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    console.log(countdownTitle,countdownDate);
    if(countdownDate===''){
        alert('please select a date');
        //reset();
    }
    else{
        countdownValue= new Date(countdownDate).getTime();
        console.log('countdown value -',countdownValue);
    }
    updateDom();
}

function reset(){
    countdownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countdownActive);
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');
   

}

function restorePreviousCountdown(){

    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedCountdown.title;
        countdownDate=savedCountdown.date;
        countdownValue= new Date(countdownDate).getTime();
        updateDom();
    }

}




countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
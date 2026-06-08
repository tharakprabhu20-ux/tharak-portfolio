// ================= THEME =================

const toggle=document.getElementById("theme-toggle");

toggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

toggle.innerHTML="☀️";

}else{

toggle.innerHTML="🌙";

}

});

// ================= SCROLL =================

const progress=document.getElementById("progress-bar");

const topBtn=document.getElementById("topBtn");

window.onscroll=()=>{

let scrollTop=document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

let scrolled=(scrollTop/height)*100;

progress.style.width=scrolled+"%";

if(scrollTop>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

};

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
// ================= TYPING EFFECT =================

const text="Full-Stack Web Developer | AI Enthusiast";

let i=0;

function typing(){

if(i<text.length){

document.getElementById("typing").innerHTML+=text.charAt(i);

i++;

setTimeout(typing,70);

}

}

typing();
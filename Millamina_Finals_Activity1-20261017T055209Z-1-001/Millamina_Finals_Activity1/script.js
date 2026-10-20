console.log("document")

const image=document.getElementById("img")
const welc=document.getElementById("welcome")
const fir=document.getElementById("first")
const sec=document.getElementById("second")
const button1=document.getElementById("btn1")
const button2=document.getElementById("btn2")
const inp=document.getElementById("input")
const text=document.getElementById("type")


image.addEventListener(
    "mouseout", function(){
        welc.innerHTML="Your mouse left the image"
        welc.style.fontSize="15px"
        image.style.transform="scale(1.0)"
    }
)

image.addEventListener(
    "mouseover", function(){
        welc.innerHTML="Welcome Back!"
        welc.style.fontSize="30px"
        image.style.transform="scale(1.1)"
    }
)

button1.addEventListener(
    "click", function(){
        fir.innerHTML="I'm a BS comp sci student"
        sec.innerHTML="I'm also currently at 3rd year"
        fir.style.color="red"
    }
)

button2.addEventListener(
    "dblclick", function(){
        fir.innerHTML="I'm gonna be a web developer in the future"
        sec.innerHTML="You double clicked the 2nd button btw"
        fir.style.color="blue"
    }
)

inp.addEventListener(
    "focus", function(){
        inp.style.backgroundColor="cyan"
    }
)


inp.addEventListener(
    "blur", function(){
        inp.style.backgroundColor="white"
    }
)


inp.addEventListener(
    "input", function(){
        text.innerHTML="You're typing: " + inp.value
    }
)


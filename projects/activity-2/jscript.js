const Message=document.getElementById("message")
const Button1=document.getElementById("loadbtn")
const Profile=document.getElementById("profile")
const Grades=document.getElementById("grades")
const Schedule=document.getElementById("schedule")

Button1.addEventListener(
    "click", function(){
        Message.innerHTML="Loading dashboard"

        Profile.innerHTML="Profile waiting"
        Grades.innerHTML="Grades waiting"
        Schedule.innerHTML="Schedule waiting"

        const profilepromise=new Promise(function(resolve){
    setTimeout(function(){
        Profile.innerHTML="Profile loaded!"
        resolve();
    }, 1000)
})


const gradespromise=new Promise(function(resolve){
    setTimeout(function(){
        Grades.innerHTML="Grades loaded!"
        resolve();
    }, 2000)
})

const schedulepromise=new Promise(function(resolve){
    setTimeout(function(){
        Schedule.innerHTML="Schedule loaded!"
        resolve();
    }, 3000)
})
Promise.all([profilepromise, gradespromise, schedulepromise])
.then(function(){
    Message.innerHTML="Dashboard Ready"

     })
})

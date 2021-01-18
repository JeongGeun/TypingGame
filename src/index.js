import './index.css'
import {routes,onNavigate,setHomeView} from './router'


let state = "Ready"
let isPassed = false
let isPlaying  = false
let timeInterval
let arr=[]
let arrnum=0
let avgTime=0


function init()
{
    document.getElementById("second").innerText=""
    document.getElementById('word').value=""
    avgTime=0
    document.getElementById("startBtn").onclick=startGame
    document.getElementById("word").addEventListener("keypress",checkMatch) 
    getData()
}
function getData(){
    const url ="https://my-json-server.typicode.com/kakaopay-fe/resources/words";
    const config ={
        method : 'get'
    }
    fetch(url,config).then(res=>res.json())
                     .then(data=>setScore(data))
}

function setScore(data){
    const score=document.getElementById('totalScore')
    score.innerText=data.length
    arr=[]
    arrnum=arr.length
    data.forEach(element => {
        arr.push(element)
    });    
    
}

function startGame(event){
    const division1 =document.getElementById('division1')
    const division2 =document.getElementById('division2')
    const startBtn = document.getElementById('startBtn')
 
    init()

    if(state==="Ready")
    {
        state="Started"
        division1.style.display = "none"
        division2.style.display = "block"
        startBtn.innerText="초기화"
        
        run(arr[arrnum]['second'],arr[arrnum]['text'])
    }
     else{
        state="Ready"
        division1.style.display = "block"
        division2.style.display=  "none"
        startBtn.innerText="시작"
        clearInterval(timeInterval)
    }
}

function run(time,text)
{
    isPlaying=true
    isPassed =false
    document.getElementById('word').focus()
    document.getElementById("second").innerText=time
    document.getElementById('target').innerText=text
    timeInterval = setInterval(countDown,1000);
   
}

function countDown()
{
    let sec =parseInt(document.getElementById("second").innerText)
    const score = document.getElementById('totalScore')
    const app = document.getElementById('app')

    if(!isPlaying)
    {
        clearInterval(timeInterval)
        const success_time = parseInt(score.innerText)===0? 0 : avgTime/parseInt(score.innerText)
        const data ={
            score : score.innerText,
            time : success_time.toFixed(2)
        }
        onNavigate(data,'/complete',app)
        return
    }

    sec>0 ? sec--: isPassed=true
    avgTime++
    if(isPassed)
    {
        if(sec===0)
        {
            score.innerText = parseInt(score.innerText)-1
            arrnum++;
            if(arrnum>=arr.length)
            {
                isPlaying=false
                return
            }
            document.getElementById("second").innerText=arr[arrnum]['second']
            document.getElementById('target').innerText=arr[arrnum]['text']        
        }
        isPassed=false
    }
    else
    {
        document.getElementById("second").innerText=sec
    }
}

function checkMatch(event)
{
    
    if(event.keyCode===13)
    {
        const word =document.getElementById('word')
      
        if(word.value===target.innerText)
        {
            isPassed =true;
            arrnum++
            if(arr.length<=arrnum) {
                isPlaying=false
                return
            } 
            document.getElementById("second").innerText=arr[arrnum]['second']
            document.getElementById('target').innerText=arr[arrnum]['text']
            word.value=""

        }
        else
        {
            word.value=""
            
        }
    }
}




window.onpageshow= function(){
    const app= document.getElementById("app")
    app.innerHTML =routes[window.location.pathname]
    init()
}

window.onpopstate = () => {
    app.innerHTML = routes[window.location.pathname]
    init()
}
import './index.css'

let state = "Ready"
let isPassed = false
let isPlaying  = false
//let time = 0
let timeInterval
let checkInterval
let arr=[]
let arrnum=0

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

function startGame(){
    const division1 =document.getElementById('division1')
    const division2 =document.getElementById('division2')
    const startBtn = document.getElementById('startBtn')
    
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
        getData()
    }
}

function run(time,text)
{
    //if(isPlaying) return
    isPlaying=true
    isPassed =false
    document.getElementById('word').focus()
    document.getElementById("second").innerText=time
    document.getElementById('target').innerText=text
    timeInterval = setInterval(countDown,1000);
    //checkInterval = setInterval(checkStatus,100);
}

function countDown()
{
    let sec =parseInt(document.getElementById("second").innerText)
    const score = document.getElementById('totalScore')

    if(!isPlaying)
    {
        clearInterval(timeInterval)
        return
    }

    sec>0 ? sec--: isPassed=true
    if(isPassed && sec===0)
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
        isPassed=false
    }
    else
    {
        document.getElementById("second").innerText=sec
    }
}

// function checkStatus()
// {
//     const sec =parseInt(document.getElementById("second").innerText)
//     const score = document.getElementById('totalScore')
//     if(isPassed && sec===0)
//     {
//         clearInterval(checkInterval)
//         score.innerText = parseInt(score.innerText)-1
//         document.getElementById("second").innerText=arr[arrnum]['second']
//         document.getElementById('target').innerText=arr[arrnum]['text']
//     }

// }

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
           // isPlaying=false
        }
        else
        {
            word.value=""
            
        }
    }
}

document.getElementById("startBtn").onclick=startGame
document.getElementById("word").addEventListener("keypress",checkMatch)
getData()
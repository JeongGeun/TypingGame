import {CompleteView} from './complete'
import {home} from './home'
const CView=CompleteView
const HView=home

export const routes = {
    '/' : HView,
    '/complete' : CView
}

export function onNavigate(data,pathname,rootDiv) {
    window.history.pushState(
        data,
        pathname,
        window.location.origin + pathname
      )
      rootDiv.innerHTML = routes[pathname]
      if(pathname==='/complete')
      setCompleteView(data['score'],data['time'])
      
}

function setCompleteView(score,time){
    document.getElementById('ctotalScore').innerText=score
    document.getElementById('avgTime').innerText=time
    document.getElementById('restart').addEventListener('click',function(){
        history.back()
    })
}

export function setHomeView(){
  
}


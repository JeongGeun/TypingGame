import { CompleteView } from './view/complete';
import { home } from './view/home';
const CView = CompleteView;
const HView = home;

export function onNavigate(data, pathname, rootDiv) {
  window.history.pushState(data, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname];
  // setCompleteView는 완료화면에만 속하는 기능이기 때문에 router에 위치하기 보다는 해당 view에 위치하는게 좋을 듯합니다.
  if (pathname === '/complete') setCompleteView(data['score'], data['time']);
}

function setCompleteView(score, time) {
  document.getElementById('ctotalScore').innerText = score;
  document.getElementById('avgTime').innerText = time;
  document.getElementById('restart').addEventListener('click', function () {
    history.back();
  });
}

class Router{

  constructor(routes){
    this.routes=routes;

    this.setPath();
    this.onNavigate();
    this.onPopstate();
  }

  setPath = () =>{
    for(let path in this.routes)
    {
      this.routes[path].setRoute(this);
    }
  };

  onNavigate = () =>{
    for(let path in this.routes)
    {
      if(path===window.location.pathname)
      {
          this.routes[path].callRenderService();
          return; 
      }
    }
  };

  onPopstate = () =>{
    window.addEventListener("popstate",onNavigate)
  }

  changePath = (message,pathname) =>{
    window.history.pushState(message,pathname, window.location.origin + pathname);
    this.onNavigate();
  };
}

export default Router;

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
    window.onpopstate=this.onNavigate;
  }

  changePath = (message,pathname) =>{
    window.history.pushState(message,pathname, window.location.origin + pathname);
    this.onNavigate();
  };
}

export default Router;

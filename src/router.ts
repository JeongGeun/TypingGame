import { Controller } from './type';
//각 Path에 맞는 controller를 설정하고 렌더링해주는 클래스

export type Message = {
  score?: number,
  time?: number
};

type Routes = {
  [pathname: string] : Controller
};

class Router {
  routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;

    this.setPath();
    this.onNavigate();
    this.onPopstate();
  }

  setPath = () => {
    for (let path in this.routes) {
      this.routes[path].setRoute(this);
    }
  };

  onNavigate = () => {
    for (let path in this.routes) {
      if (path === window.location.pathname) {
        this.routes[path].callRenderService();
        return;
      }
    }
  };

  onPopstate = () => {
    window.onpopstate = this.onNavigate;
  };

  // CompleteController에서 이 함수를 사용할 때 this.route.changePath({}, '/'); 게 사용하고 있는데요
  // 첫번째 파라미터에 옵셔널 값이 들어가는 패턴은 좋지 않습니다.
  // 필수값에 해당하는 pathname을 첫번째 파라미터로 넣고, 두번째 파라미터를 옵셔널 값으로 설정하는게 더욱 좋을 듯합니다.
  changePath = (pathname: string, { score=0,time=0 }: Message) => {
    window.history.pushState({score,time}, pathname, window.location.origin + pathname);
    this.onNavigate();
  };
}

export default Router;

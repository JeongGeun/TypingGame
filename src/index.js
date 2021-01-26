import './index.css';
import Router from './router';
import Store from './store';
import HomeController from './controller/home-controller';
import CompleteController from './controller/complete-controller';
import RenderCompleteView from './render/render-complete';
import RenderHomeView from './render/render-home';
import { HomeView } from './view/home';
import { CompleteView } from './view/complete';

// 전제척으로 코드 인덴트 및 함수 스타일도 다 다릅니다. prettier를 세팅하여 포맷팅을 맞춰주세요.
// 각 view의 controller를 여기서 다 하고 있습니다. 각 view를 제어하는 controller를 만들어서 분리를 한번 시도해보세요.

// 1. 모든 함수의 형태를 arrow 형태로 변경
// 2. route, controller, render 클래스로 분리
// 3. route 클래스 : path에 따른 controller를 주입
// 4. controller 클래스 : 각 화면에서 일어나는 이벤트 제어
// 5. render 클래스 : 각 화면의 HTML 요소를 가지며 동적 뷰를 생성함.

window.onpageshow = () => {
  // routes object에 직접 접근해서 view를 가져오기 보다 router에 view를 가져오는 함수를 마련해서 하는게 좋을 듯합니다.
  // pathname에 routes에 정의되지 않는 pathname이 오는 경우는 undefined를 표시합니다, => Q. url 직접접근을 막는다는 뜻인가요?

  // 이건 사견이지만, 만약 이서비스가 확장을 한다면 여기에 모든 routing 정보들을 기입할텐데요.
  // 여기서 생성해서 Router에 넘겨주기보다, Router안에서 각 controller들을 생성해서 사용하고,
  // 각 View는 Controller에 종속적이니 애초에 Controller안에서 import해서 사용해도 좋을 듯합니다.
  const store = new Store();
  const renderHome = new RenderHomeView(HomeView);
  const homeController = new HomeController(store, renderHome);

  const renderComplete = new RenderCompleteView(CompleteView);
  const completeController = new CompleteController(store, renderComplete);

  const route = new Router({
    '/': homeController,
    '/complete': completeController,
  });

  route.onNavigate();
};

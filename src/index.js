import './index.css';
import Router, { routes, onNavigate } from './router';
import HomeController from './controller/home-controller';
import CompleteController from './controller/complete-controller';
import RenderCompleteView from './render/render-complete';
import RenderHomeView from './render/render-home';
import { HomeView } from './view/home';
import { CompleteView } from './view/complete';

// 전제척으로 코드 인덴트 및 함수 스타일도 다 다릅니다. prettier를 세팅하여 포맷팅을 맞춰주세요.
// 각 view의 controller를 여기서 다 하고 있습니다. 각 view를 제어하는 controller를 만들어서 분리를 한번 시도해보세요.


window.onpageshow = () => {

  // routes object에 직접 접근해서 view를 가져오기 보다 router에 view를 가져오는 함수를 마련해서 하는게 좋을 듯합니다.
  // pathname에 routes에 정의되지 않는 pathname이 오는 경우는 undefined를 표시합니다,
  const renderHome = new RenderHomeView(HomeView);
  const homeController = new HomeController(renderHome);

  const renderComplete =new RenderCompleteView(CompleteView);
  const completeController =new CompleteController(renderComplete);
  
  const route = new Router({
    '/' : homeController,
    '/complete' : completeController
  });

  route.onNavigate();

};

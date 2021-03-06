import Store from "../store"
import Router from '../router';
import { View } from "../type"


// controller에 공통 기능 및 변수를 모은 집합 클래스
class ParentController<T extends View> {
  store: Store;
  view: T;
  route: Router;

  constructor(store : Store, view : T) {
    this.store = store;
    this.view = view;
  }
  // 각 controller 클래스에 route 객체를 할당하여 Controller에서도 라우팅을 가능하게 함.
  setRoute = (route: Router) => {
    this.route = route;
  };

  //render 서비스 호출하여 뷰를 그릴수 있도록함.
  callRenderService = () => {};
}

export default ParentController;

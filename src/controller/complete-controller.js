import ParentController from './parent-controller';

// 완료 화면의 이벤트를 제어하는 controller
class CompleteController extends ParentController {
  constructor(store,render) {
    super(store,render);
  }

  callRenderService = () => {
    this.render.renderView();
    this.addCompleteEvent();
  };

  addCompleteEvent = () => {
    this.render.getRestartBtn().addEventListener('click', this.goToHomePath);
  };
  goToHomePath = () => {
    this.route.changePath({}, '/');
  };
}

export default CompleteController;

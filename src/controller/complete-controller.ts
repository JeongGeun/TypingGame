import ParentController from './parent-controller';
import Store from '../store';
import RenderCompleteView from '../render/render-complete'
import { Message } from '../router';

// 완료 화면의 이벤트를 제어하는 controller
class CompleteController extends ParentController<RenderCompleteView> {
  
  constructor(store: Store, view:RenderCompleteView) {
    super(store, view);
  }

  callRenderService = () => {
    this.view.renderView();
    this.addCompleteEvent();
  };

  addCompleteEvent = () => {
    this.view.getRestartBtn().addEventListener('click', this.goToHomePath);
  };
  goToHomePath = () => {
    this.route.changePath('/', {});
  };
}

export default CompleteController;

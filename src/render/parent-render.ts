import { View } from "../type"

class ParentRender {
  view: string;
  app: HTMLElement;
  
  constructor() {
    this.app = document.getElementById('app');
  }
  // 초기화면에 각 화면에서 rendering하는 view를 삽입
  renderInitView = () => {
    this.app.innerHTML = this.view;
  };

  renderView = () => {};
}

export default ParentRender;

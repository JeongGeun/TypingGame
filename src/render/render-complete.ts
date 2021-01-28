import ParentRender from './parent-render';
import { CompleteView } from '../view/complete';
  
  
  
class RenderCompleteView extends ParentRender {

  restartBtn: HTMLButtonElement;
  ctotalScore: HTMLElement;
  avgTime: HTMLElement;

  constructor() {
    super();
    this.view = CompleteView;  
  }

  renderView = () => {
    this.renderInitView();
    this.declareHTMLelement();
    this.setCompleteView();
  };

  declareHTMLelement = () => {
    this.restartBtn = document.getElementById('restart') as HTMLButtonElement;
    this.ctotalScore = document.getElementById('ctotalScore');
    this.avgTime = document.getElementById('avgTime');
  };

  setCompleteView = () => {
    this.ctotalScore.innerText = window.history.state.score;
    this.avgTime.innerText = window.history.state.time;
  };
  getRestartBtn = () => this.restartBtn;
}

export default RenderCompleteView;

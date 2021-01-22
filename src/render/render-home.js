import ParentRender from './parent-render';
import LoadingImage from '../images/loading.gif';

class RenderHomeView extends ParentRender {
  constructor(view) {
    super(view);
  }

  declareHTMLelement = () => {
    this.score = document.getElementById('totalScore');
    this.second = document.getElementById('second');
    this.word = document.getElementById('word');
    this.target = document.getElementById('target');
    this.startBtn = document.getElementById('startBtn');
    this.div1 = document.getElementById('division1');
    this.div2 = document.getElementById('division2');
  };

  renderView = () => {
    this.renderInitView();
    this.declareHTMLelement();
    this.addLoadingImage();
  };

  addLoadingImage = () => {
    const loadingImage = new Image();
    loadingImage.src = LoadingImage;
    loadingImage.id = 'loadingImage';
    this.startBtn.appendChild(loadingImage);
    this.LoadingImage = document.getElementById('loadingImage');
    this.initLoadingButton();
  };
  showGameView = (second, text) => {
    this.div1.style.display = 'none';
    this.div2.style.display = 'block';
    this.startBtn.innerText = '초기화';
    this.second.innerText = second;
    this.target.innerText = text;
  };

  hideGameView = () => {
    this.div1.style.display = 'block';
    this.div2.style.display = 'none';
    this.startBtn.innerText = '시작';
  };

  initializeSecondAndWord = () => {
    this.second.innerText = '';
    this.word.innerText = '';
  };

  decreaseSecond = () => {
    this.second.innerText = (parseFloat(this.second.innerText) - 0.1).toFixed(2);
  };

  decreaseScore = () => {
    this.score.innerText = parseInt(this.score.innerText) - 1;
  };

  renderNextWordAndSecond = (second, text) => {
    this.second.innerText = second;
    this.target.innerText = text;
  };

  clearWords = () => {
    this.word.value = '';
  };

  setScore = score => {
    this.score.innerText = score;
  };

  initLoadingButton = () => { 
    this.LoadingImage.style.display = 'inline-block;';
    this.startBtn.disabled = true;
  };
  showLoadingImage = () => {
    this.LoadingImage.style.display = 'inline-block;';
  };

  hideLoadingImage = () => {
    this.LoadingImage.style.display = 'none';
    this.startBtn.disabled = false;
    this.startBtn.innerText = '시작';
  };

  getStartBtnElement = () => this.startBtn;
  getWordElement = () => this.word;
  getSecondElement = () => this.second;
  getTargetElement = () => this.target;
  getScoreElement = () => this.score;
}

export default RenderHomeView;

import ParentRender from './parent-render';
import LoadingImage from '../images/loading.gif';
import { HomeView } from '../view/home';

class RenderHomeView extends ParentRender {
  
  score: HTMLElement;
  second: HTMLElement;
  word: HTMLInputElement;
  target: HTMLElement;
  startBtn: HTMLButtonElement;
  div1: HTMLElement;
  div2: HTMLElement;
  LoadingImage: HTMLElement;
  
  constructor() {
    super();
    this.view = HomeView;
  }

  declareHTMLelement = () => {
    this.score = document.getElementById('totalScore');
    this.second = document.getElementById('second');
    this.word = document.getElementById('word') as HTMLInputElement;
    this.target = document.getElementById('target');
    this.startBtn = document.getElementById('startBtn') as HTMLButtonElement;
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
  showGameView = (second: number, text:string) => {
    this.div1.style.display = 'none';
    this.div2.style.display = 'block';
    this.startBtn.innerText = '초기화';
    this.second.innerText = `${second}`;
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

  renderNextWordAndSecond = (second : number, text: string) => {
    this.second.innerText = `${second}`;
    this.target.innerText = text;
  };

  clearWords = () => {
    this.word.value = '';
  };

  setScore = (score: number) => {
    this.score.innerText = `${score}`;
  };

  setSecond = (second:number) => {
    this.second.innerText = second.toFixed(2);
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

import ParentController from './parent-controller';

//게임 화면에서 일어나는 타이머, 인풋 입력 체크, 게임 종료 체크 등과 같은 기능을 제공
class HomeController extends ParentController {
  constructor(render) {
    super(render);
    this.state = 'Ready';
    this.isPassed = false;
    this.isPlaying = false;
    this.dataIndex = 0;
    this.avgTime = 0;
    this.typingTime = 0;
    this.targetTime = 0;
  }

  callRenderService = () => {
    this.render.renderView();
    this.addHomeEvent();
    this.initializeGame();
  };

  getData = () => {
    const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
    const config = {
      method: 'get',
    };
    fetch(url, config)
      .then(res => res.json())
      .then(data => this.setData(data));
  };

  setData = data => {
    this.data = data;
    this.render.setScore(data.length);
  };

  addHomeEvent = () => {
    this.render.getStartBtnElement().addEventListener('click', this.startGame);
    this.render.getWordElement().addEventListener('keypress', this.checkMatch);
  };

  initializeGame = () => {
    this.getData();
    this.render.initializeSecondAndWord();
    this.render.clearWords();
    this.avgTime = 0;
    this.dataIndex = 0;
  };

  startGame = () => {
    this.initializeGame();
    if (this.state === 'Ready') {
      this.state = 'Started';
      this.isPlaying = true;
      this.isPassed = false;
      this.targetTime = parseFloat(this.data[this.dataIndex]['second']).toFixed(2);
      this.render.showGameView(
        this.data[this.dataIndex]['second'],
        this.data[this.dataIndex]['text'],
      );
      this.render.getWordElement().focus();
      this.startCountDown();
    } else {
      this.state = 'Ready';
      this.render.hideGameView();
      this.endCountDown();
    }
  };

  startCountDown = () => {
    this.timeInterval = setInterval(this.countDown, 100);
  };

  endCountDown = () => {
    clearInterval(this.timeInterval);
  };

  countDown = () => {
  
    let score = parseInt(this.render.getScoreElement().innerText);
    if (!this.isPlaying) {
      const success_time = score === 0 ? 0 : this.avgTime / score;
      this.endCountDown();
      const message = {
        score: score,
        time: success_time.toFixed(2),
      };

      this.route.changePath(message, '/complete');
      return;
    }
   
    if (!this.isPassed) {
      this.typingTime < this.targetTime ? this.typingTime+=0.1 : (this.isPassed=true)
    }

    if (this.isPassed) {
      if (this.typingTime >= this.targetTime) {
        this.render.decreaseScore();
      } else {
        this.avgTime += this.typingTime;
      }
      this.dataIndex++;
      if (this.isFinish()) return;

      this.render.renderNextWordAndSecond(
        this.data[this.dataIndex]['second'],
        this.data[this.dataIndex]['text'],
      );
      this.typingTime = 0;
      this.targetTime = parseFloat(this.data[this.dataIndex]['second']).toFixed(2);
      this.isPassed = false;
    } else {
      if (this.typingTime < this.targetTime)
      this.render.decreaseSecond();
    }
  };

  checkMatch = event => {
    if (event.keyCode === 13) {
      if (this.render.getWordElement().value === this.render.getTargetElement().innerText) {
        this.isPassed = true;
      }
      this.render.clearWords();
    }
  };

  isFinish = () => {
    if (this.dataIndex >= this.data.length) {
      this.isPlaying = false;
      this.state = 'Ready';
      return true;
    }
    return false;
  };
}

export default HomeController;

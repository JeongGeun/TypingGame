import ParentController from './parent-controller';

//게임 화면에서 일어나는 타이머, 인풋 입력 체크, 게임 종료 체크 등과 같은 기능을 제공

/* 
    게임 전략
    1. setInterval 함수를 통해 0.1초마다 countDown함수를 실행한다.
    2. checkMatch함수를 통해 인풋의 답과 문제가 일치할 경우 isPassed값을 true로 바꾼다.
    3. isPassed ===true일때 남은 시간이 있으면 평균을 구하는 시간에 더해주고 아니면 점수를 1점 차감한다.
    4. 다음문제로 넘어가고 다음문제가 없을 경우 완료화면으로 넘어간다.
 */

/*
    리뷰
    1. 데이터가 들어오기 전에 호출하면 에러가 남
    2. enter 후에 바로 단어들 띄우게 함
    3. 데이터를 store를 해서 상태관리를 위한 파일을 분리
 */

class HomeController extends ParentController {
  constructor(store,render) {
    super(store,render);
  }
  //home화면을 렌더링하고 이벤트를 등록한다.
  callRenderService = () => {
    this.render.renderView();
    this.addHomeEvent();
    this.initializeGame();
  };
  //서버에서 데이터를 가져옴
  fetchData = () => {
    const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
    const config = {
      method: 'get',
    };
    fetch(url, config)
      .then(res => res.json())
      .then(data => this.setData(data))
      .then(this.render.hideLoadingImage);
  };

  setData = data => {
    this.store.setData(data);
    this.store.setScore(data.length);
    this.render.setScore(data.length);
  };
  //"시작", "초기화" 버튼의 클릭이벤트와 인풋입력을 감지하여 pass/fail을 결정하는 이벤트를 등록한다.
  addHomeEvent = () => {
    this.render.getStartBtnElement().addEventListener('click', this.startGame);
    this.render.getWordElement().addEventListener('keypress', this.checkMatch);
  };
  //게임 시작 시에 html요소들을 초기화한다.
  initializeGame = () => {
    
    if (this.store.getData().length === 0) {
      this.fetchData();
    } else {
      this.store.setScore(this.store.getData().length);
      this.render.setScore(this.store.getData().length);
      this.render.hideLoadingImage();
    }
    this.render.initializeSecondAndWord();
    this.render.clearWords();
    this.store.initGame();
  };
  //초기값을 세팅해주고 게임을 시작한다.
  startGame = () => {
    this.initializeGame();
    if (this.store.getState() === 'Ready') {
      this.store.setState('Started');
      this.store.setisPlaying(true);
      this.store.setisPassed(false);
    
      this.store.setTargetTime (parseFloat(this.store.getData()[this.store.getDataIndex()]['second']).toFixed(2));
      this.render.showGameView(
        this.store.getData()[this.store.getDataIndex()]['second'],
        this.store.getData()[this.store.getDataIndex()]['text'],
      );
      this.render.getWordElement().focus();
      this.startCountDown();
    } else {
      this.store.setState('Ready');
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
  /*
    이름 : countDown
    설명
    1. isPlaying이 false이면 게임이 종료되었다는 의미이미로 complete화면으로 최종점수와 평균시간을 보낸다.
    2. isPassed가 false이면 아직 문제를 풀지 못했다는 의미이므로 typingTime을 0.1초 증가시키고 typingTime이 targetTime보다 크면 isPassed를 true로 변경한다.
    3. isPassed가 true일때
      3.1) typingTime이 targetTime보다 클 경우 스코어를 1점 차감한다
      3.2) typingTime이 targetTine보다 작을 경우 평균시간에 typingTime을 더한다.
      3.3) 다음문제를 진행하고 다음문제가 없을경우 isPlaying과 state변수를 초기화 시킨다.
    4. isPassed가 false이면 시간을 0.1초씩 감소시킨다.
  */
  countDown = () => {
    if (!this.store.getisPlaying()) {
      this.sendDataToComplete();
      return;
    }

    if (!this.store.getisPassed()) {
      this.store.getTypingTime() < this.store.getTargetTime() ? (this.store.increaseTypingTime()) : (this.store.setisPassed(true));
    }

    if (this.store.getisPassed()) {
      this.passToNextWords();
    } else {
      if (this.store.getTypingTime() < this.store.getTargetTime()) this.render.decreaseSecond();
    }
  };
  //문제가 맞았을 경우 isPassed를 true로 만든다.
  checkMatch = event => {
    if (event.keyCode === 13) {
      if (this.render.getWordElement().value === this.render.getTargetElement().innerText) {
        this.store.setisPassed(true);
        this.passToNextWords();
        if (this.isFinish()) this.sendDataToComplete();
      }
      this.render.clearWords();
    }
  };

  isFinish = () => {
    if (this.store.getDataIndex() >= this.store.getData().length) {
      this.store.setisPlaying(false);
      this.store.setState('Ready');
      return true;
    }
    return false;
  };

  sendDataToComplete = () => {
    let score = this.store.getScore();
    const success_time = score === 0 ? 0 : this.store.getAvgTime() / score;
    this.endCountDown();
    const message = {
      score: score,
      time: success_time.toFixed(2),
    };

    this.route.changePath(message, '/complete');
  };

  passToNextWords = () => {
    if (this.store.getTypingTime() >= this.store.getTargetTime()) {
      this.render.decreaseScore();
      this.store.decreaseScore();
    } else {
      this.store.increaseAvgTime(this.store.getTypingTime());
    }
    this.store.increaseDataIndex();
    if (this.isFinish()) return;
    this.render.clearWords();
    this.render.renderNextWordAndSecond(
      this.store.getData()[this.store.getDataIndex()]['second'],
      this.store.getData()[this.store.getDataIndex()]['text'],
    );
    this.store.initTypingTime();
    this.store.setTargetTime(parseFloat(this.store.getData()[this.store.getDataIndex()]['second']).toFixed(2));
    this.store.setisPassed(false);
  };
}

export default HomeController;

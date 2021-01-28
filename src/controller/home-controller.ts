import ParentController from './parent-controller';
import Store from '../store';
import RenderHomeView from '../render/render-home'
import { Word } from '../type'
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

class HomeController extends ParentController<RenderHomeView> {
  // render 는 동사이기 때문에 this.render.renderView 와 같이 사용될 때 의미가 모호해질 수 있습니다.
  // render보다는 RenderHomeView 를 생성해서 전달했기 때문에 view라는 단어가 좀더 나아 보입니다.
  //store: Store;
  //view: RenderHomeView;
  timeInterval: NodeJS.Timeout;
  
  constructor(store: Store, view: RenderHomeView) {
    super(store, view);
  }
  //home화면을 렌더링하고 이벤트를 등록한다.
  callRenderService = () => {
    this.view.renderView();
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
      .then(this.view.hideLoadingImage);
  };

  setData = (data:Word[]) => {
    this.store.data = data;
    this.store.score = data.length;
    this.view.setScore(data.length);
  };
  //"시작", "초기화" 버튼의 클릭이벤트와 인풋입력을 감지하여 pass/fail을 결정하는 이벤트를 등록한다.
  addHomeEvent = () => {
    this.view.getStartBtnElement().addEventListener('click', this.startGame);
    this.view.getWordElement().addEventListener('keypress', this.checkMatch);
  };
  //게임 시작 시에 html요소들을 초기화한다.
  initializeGame = () => {
    if (this.store.data.length === 0) {
      this.fetchData();
    } else {
      this.store.score = this.store.data.length;
      this.view.setScore(this.store.data.length);
      this.view.hideLoadingImage();
    }
    this.view.initializeSecondAndWord();
    this.view.clearWords();
    this.store.initGame();
  };
  //초기 html요소를 세팅해주고 게임을 시작한다.
  startGame = () => {
    this.initializeGame();
    const state = this.store.state;
    // state에 해당하는 string은 const로 따로 빼서 정의를 하고 변수로 세팅해주는 것이 좀더 안전합니다.
    if (state === 'Ready') {
      this.store.state = 'Started';
      this.store.isPlaying = true;
      this.store.isPassed = false;

      // 여기도 마찬가지이지만 변수의 property도 고정된 string이기 때문에 const로 정의를 해서 사용하는 것이 좋습니다.
      // 더욱이 second, text는 store에서 사용되는 것들이니 일관성을 유지하기 위해서는 이 변수들을 Store에 정의를 해두고,
      // store를 가져다 쓰는 쪽에서 이 변수도 가져와서 사용하는 것이 더욱 안전합니다.

      this.store.targetTime = this.store.data[this.store.dataIndex].second;
      this.store.second = this.store.data[this.store.dataIndex].second;
      this.view.showGameView(
        this.store.data[this.store.dataIndex].second,
        this.store.data[this.store.dataIndex].text,
      );
      this.view.getWordElement().focus();
      this.startCountDown();
    } else {
      this.store.state = 'Ready';
      this.view.hideGameView();
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
    1. isPassed가 false이면 아직 문제를 풀지 못했다는 의미이므로 typingTime을 0.1초 증가시키고 typingTime이 targetTime보다 크면 isPassed를 true로 변경한다.
    2. isPassed가 true일때
      2.1) typingTime이 targetTime보다 클 경우 스코어를 1점 차감한다
      2.2) typingTime이 targetTime보다 작을 경우 평균시간에 typingTime을 더한다.
      2.3) 다음문제를 진행하고 다음문제가 없을경우 isPlaying과 state변수를 초기화 시키고 게임을 종료시킨다.
    3. isPassed가 false이면 시간을 0.1초씩 감소시킨다.
  */
  countDown = () => {
    // 함수 이름을 정의를 할때에는 case를 잘 맞추는 것이 좋습니다.
    // camelCase이니 getisPassed 보다는 getIsPassed가 가독성이 더욱 좋습니다.
    if (!this.store.isPassed) {
      this.store.typingTime < this.store.targetTime
        ? this.store.increaseTypingTime()
        : (this.store.isPassed = true);
    }

    if (this.store.isPassed) {
      this.passToNextWords();
    } else {
      if (this.store.typingTime < this.store.targetTime) {
        this.store.decreaseSecond();
        this.view.setSecond(this.store.second);
      }
    }
  };
  //문제가 맞았을 경우 isPassed를 true로 만들고 다음 단어로 넘어가는 함수를 실행한다.
  checkMatch = event => {
    if (event.keyCode === 13) {
      if (this.view.getWordElement().value === this.view.getTargetElement().innerText) {
        this.store.isPassed = true;
        this.passToNextWords();
      }
      this.view.clearWords();
    }
  };
  /*
    모듈명 : isFinish
    설명 : dataIndex가 총 데이터의 길이를 넘어갈 경우 남은 단어가 없다고 판단하고 interval 종료 및 게임을 종료 시킨다.
  */
  isFinish = () => {
    if (this.store.dataIndex >= this.store.data.length) {
      this.store.isPlaying = false;
      this.store.state = 'Ready';
      this.endCountDown();
      return true;
    }
    return false;
  };
  /*
    모듈명 : sendDataToComplete
    설명 : 완료화면으로 라우팅을 담당. 더 이상 남은 단어들이 없을 경우에 실행되어 평균 시간과 총 점수를 보낸다. 
  */
  sendDataToComplete = () => {
    let score = this.store.score;
    const success_time = score === 0 ? 0 : this.store.avgTime / score;
    const message = {
      score: score,
      time: parseFloat(success_time.toFixed(2)),
    };

    this.route.changePath('/complete', message);
  };
  /*
    모듈명 : passToNextWords
    설명 : 단어를 맞추거나 시간이 지났을 경우 다음 단어로 넘어가는 것에 대한 처리를 담당한다.
    만약, 더 이상 남은 단어들이 없다면 interval을 종료한다.
  */
  passToNextWords = () => {
    if (this.store.typingTime >= this.store.targetTime) {
      this.store.decreaseScore();
      this.view.setScore(this.store.score);
    } else {
      this.store.increaseAvgTime(this.store.typingTime);
    }
    this.store.increaseDataIndex();
    if (this.isFinish()) {
      this.sendDataToComplete();
      return;
    }
    this.view.clearWords();
    this.store.second = this.store.data[this.store.dataIndex].second;
    this.view.renderNextWordAndSecond(
      this.store.data[this.store.dataIndex].second,
      this.store.data[this.store.dataIndex].text,
    );
    this.store.initTypingTime();
    this.store.targetTime = this.store.data[this.store.dataIndex].second;
    this.store.isPassed = false;
  };
}

export default HomeController;
